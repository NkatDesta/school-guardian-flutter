import 'dart:convert';
import 'package:http/http.dart' as http;
import 'registrar_api.dart';

class ApiService {
  static Future<Map<String, String>> _defaultHeaders() async {
    final token = RegistrarApi.getToken();
    if (token == null || token.isEmpty) {
      throw StateError(
        'No authentication token available. Please login again.',
      );
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  static Future<http.Response> get(String url) async {
    final headers = await _defaultHeaders();
    return await http.get(Uri.parse(url), headers: headers);
  }

  static Future<http.Response> post(
    String url,
    Map<String, dynamic> body,
  ) async {
    final headers = await _defaultHeaders();
    return await http.post(
      Uri.parse(url),
      headers: headers,
      body: jsonEncode(body),
    );
  }
}
