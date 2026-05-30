import 'dart:convert';
import 'package:http/http.dart' as http;
import 'registrar_api.dart'; // token management
import '../models/notification_model.dart';

class NotificationApi {
  static const String baseUrl = 'http://localhost:3000/api/notifications';
  
  static String? _getToken() {
    return RegistrarApi.getToken(); // Reuse the same token from RegistrarApi
  }

  static Future<List<NotificationModel>> getNotifications() async {
    try {
      final token = _getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      print("Fetching notifications...");
      
      final response = await http.get(
        Uri.parse(baseUrl),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      print("Response status: ${response.statusCode}");
      print("Response body: ${response.body}");

      if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      }

      final data = jsonDecode(response.body);
      
      // Check if response has success field (like RegistrarApi)
      if (response.statusCode == 200 && data['success'] == true) {
        // Handle different possible data structures
        List<dynamic> notificationsList = [];
        
        if (data['data'] != null) {
          if (data['data'] is List) {
            // Direct array in data field
            notificationsList = data['data'];
          } else if (data['data'] is Map && data['data']['notifications'] != null) {
            // Nested notifications array
            notificationsList = data['data']['notifications'];
          } else if (data['data'] is Map && data['data']['items'] != null) {
            // Alternative structure
            notificationsList = data['data']['items'];
          }
        } else if (data['notifications'] != null) {
          // Direct notifications field
          notificationsList = data['notifications'];
        } else if (data is List) {
          // Response is directly an array
          notificationsList = data;
        }
        
        print("Found ${notificationsList.length} notifications");
        
        return notificationsList
            .map((item) => NotificationModel.fromJson(item as Map<String, dynamic>))
            .toList();
      } else if (response.statusCode == 200 && data is List) {
        // Response is directly an array without success wrapper
        print("Response is direct array with ${data.length} notifications");
        return data
            .map((item) => NotificationModel.fromJson(item as Map<String, dynamic>))
            .toList();
      } else {
        throw Exception(data['error']?['message'] ?? data['message'] ?? "Failed to load notifications");
      }
    } catch (e) {
      print("Error in getNotifications: $e");
      throw Exception("Failed to load notifications: $e");
    }
  }

  static Future<bool> createNotification({
    required String title,
    required String content,
    String priority = 'normal',
    String recipientGroup = 'all',
  }) async {
    try {
      final token = _getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      final Map<String, dynamic> requestBody = {
        'title': title,
        'content': content,
        'priority': priority,
        'recipientGroup': recipientGroup,
      };
      
      print("Creating notification with body: $requestBody");
      
      final response = await http.post(
        Uri.parse(baseUrl),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode(requestBody),
      );

      print("Create Response status: ${response.statusCode}");
      print("Create Response body: ${response.body}");

      if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      }

      final data = jsonDecode(response.body);

      if (response.statusCode == 201 || response.statusCode == 200) {
        // Check if success field exists (like your backend pattern)
        if (data['success'] == true) {
          return true;
        } else if (data['success'] == false) {
          throw Exception(data['error']?['message'] ?? data['message'] ?? "Failed to create notification");
        } else {
          // If no success field but status is ok, assume success
          return true;
        }
      }

      throw Exception(data['error']?['message'] ?? data['message'] ?? "Failed to create notification");
    } catch (e) {
      print("Error creating notification: $e");
      rethrow;
    }
  }

  // Optional: Add method to delete notification (if needed)
  static Future<void> deleteNotification(String notificationId) async {
    try {
      final token = _getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      print("Deleting notification: $notificationId");
      
      final response = await http.delete(
        Uri.parse("$baseUrl/$notificationId"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      print("Delete Response status: ${response.statusCode}");

      if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      }

      if (response.statusCode != 200 && response.statusCode != 204) {
        final data = jsonDecode(response.body);
        throw Exception(data['error']?['message'] ?? "Failed to delete notification");
      }
    } catch (e) {
      print("Error deleting notification: $e");
      rethrow;
    }
  }
}