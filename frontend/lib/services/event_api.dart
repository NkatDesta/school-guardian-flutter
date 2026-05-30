import 'dart:convert';
import 'package:http/http.dart' as http;
import 'registrar_api.dart';
import '../models/events_model.dart';

class EventApi {
  static const String baseUrl = 'http://localhost:3000/api/events';
  
  static String? _getToken() {
    return RegistrarApi.getToken();
  }

  static Future<List<EventModel>> getEvents({String? status}) async {
    try {
      final token = _getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      final url = status != null && status != 'all' 
          ? Uri.parse('$baseUrl?status=$status')
          : Uri.parse(baseUrl);
      
      print("Fetching events from: $url");
      
      final response = await http.get(
        url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      print("Events Response: ${response.statusCode}");
      print("Events Body: ${response.body}");

      if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      }

      final data = jsonDecode(response.body);
      
      List<dynamic> eventsList = [];
      
      if (response.statusCode == 200) {
        if (data['success'] == true && data['data'] != null) {
          if (data['data'] is List) {
            eventsList = data['data'];
          } else if (data['data']['events'] != null) {
            eventsList = data['data']['events'];
          }
        } else if (data is List) {
          eventsList = data;
        } else if (data['events'] != null) {
          eventsList = data['events'];
        }
        
        print("Found ${eventsList.length} events");
        
        return eventsList
            .map((item) => EventModel.fromJson(item as Map<String, dynamic>))
            .toList();
      } else {
        throw Exception(data['error']?['message'] ?? "Failed to load events");
      }
    } catch (e) {
      print("Error in getEvents: $e");
      throw Exception("Failed to load events: $e");
    }
  }

  static Future<EventModel> createEvent({
    required String title,
    required String description,
    required DateTime startDate,
    required DateTime endDate,
    required String location,
    String? eventType,
    List<String>? targetGroups,
  }) async {
    try {
      final token = _getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      final requestBody = {
        'title': title,
        'description': description,
        'startDate': startDate.toIso8601String(),
        'endDate': endDate.toIso8601String(),
        'location': location,
        'eventType': eventType ?? 'general',
        'targetGroups': targetGroups ?? ['all'],
      };
      
      print("Creating event: $requestBody");
      
      final response = await http.post(
        Uri.parse(baseUrl),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode(requestBody),
      );

      print("Create Response: ${response.statusCode}");
      print("Create Body: ${response.body}");

      if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      }

      final data = jsonDecode(response.body);

      if (response.statusCode == 201 || response.statusCode == 200) {
        if (data['success'] == true && data['data'] != null) {
          return EventModel.fromJson(data['data']);
        } else if (data['event'] != null) {
          return EventModel.fromJson(data['event']);
        } else {
          return EventModel.fromJson(data);
        }
      }

      throw Exception(data['error']?['message'] ?? "Failed to create event");
    } catch (e) {
      print("Error creating event: $e");
      rethrow;
    }
  }

  static Future<void> rsvpToEvent(String eventId, String status) async {
    try {
      final token = _getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      final response = await http.post(
        Uri.parse("$baseUrl/$eventId/rsvp"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode({'status': status}),
      );

      if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      }

      if (response.statusCode != 200 && response.statusCode != 201) {
        final data = jsonDecode(response.body);
        throw Exception(data['error']?['message'] ?? "Failed to RSVP");
      }
    } catch (e) {
      print("Error in RSVP: $e");
      rethrow;
    }
  }
}