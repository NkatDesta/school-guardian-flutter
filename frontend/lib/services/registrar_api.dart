import 'dart:convert';
import 'package:http/http.dart' as http;

class RegistrarApi {
  static const String baseUrl = "http://localhost:3000/api/registration/registrar";
  
  static String? _authToken;
  
  static void setToken(String token) {
    _authToken = token;
    print("Token set: ${token.substring(0, token.length > 20 ? 20 : token.length)}...");
  }
  
  static String? getToken() {
    return _authToken;
  }

  static Future<List> getPendingRegistrations() async {
    try {
      final token = getToken();
      if (token == null) {
        throw Exception("Not authenticated. Please login again.");
      }

      print("Fetching pending registrations...");
      
      final response = await http.get(
        Uri.parse("$baseUrl/pending?status=pending"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      print("Response status: ${response.statusCode}");
      print("Response body: ${response.body}");

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        return data['data']['registrations'];
      } else if (response.statusCode == 401) {
        throw Exception("Session expired. Please login again.");
      } else {
        throw Exception(data['error']?['message'] ?? "Failed to load registrations");
      }
    } catch (e) {
      print("Error in getPendingRegistrations: $e");
      throw Exception("Failed to load registrations: $e");
    }
  }

  // Approve registration - NO STUDENT ID NEEDED
  static Future<void> approveRegistration(dynamic id) async {
    try {
      final token = getToken();
      if (token == null) throw Exception("Not authenticated");

      print("Approving registration: $id");
      
      final response = await http.post(
        Uri.parse("$baseUrl/$id/approve"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode({}), // Empty body
      );

      print("Approve response status: ${response.statusCode}");
      print("Approve response body: ${response.body}");

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        print("Approval successful");
        return;
      } else {
        throw Exception(data['error']?['message'] ?? "Approval failed");
      }
    } catch (e) {
      print("Error in approveRegistration: $e");
      throw Exception("Approval failed: $e");
    }
  }

  // Reject registration
  static Future<void> rejectRegistration(dynamic id, String reason) async {
    try {
      final token = getToken();
      if (token == null) throw Exception("Not authenticated");

      print("Rejecting registration: $id");
      print("Reason: $reason");
      
      final response = await http.post(
        Uri.parse("$baseUrl/$id/reject"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
        body: jsonEncode({
          "reason": reason,
          "requestCorrection": false,
        }),
      );

      print("Reject response status: ${response.statusCode}");
      print("Reject response body: ${response.body}");

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        print("Rejection successful");
        return;
      } else {
        throw Exception(data['error']?['message'] ?? "Rejection failed");
      }
    } catch (e) {
      print("Error in rejectRegistration: $e");
      throw Exception("Rejection failed: $e");
    }
  }

  // Get registration details
  static Future<Map<String, dynamic>> getDetails(dynamic id) async {
    try {
      final token = getToken();
      if (token == null) throw Exception("Not authenticated");

      final response = await http.get(
        Uri.parse("$baseUrl/$id"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $token",
        },
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        return data['data'];
      } else {
        throw Exception(data['error']?['message'] ?? "Failed to load details");
      }
    } catch (e) {
      print("Error in getDetails: $e");
      throw Exception("Failed to load details: $e");
    }
  }
}