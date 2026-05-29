import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class RegistrationDetailsPage extends StatefulWidget {
  final dynamic id;

  const RegistrationDetailsPage({super.key, required this.id});

  @override
  State<RegistrationDetailsPage> createState() =>
      _RegistrationDetailsPageState();
}

class _RegistrationDetailsPageState extends State<RegistrationDetailsPage> {
  bool loading = true;
  Map<String, dynamic>? data;

  final String baseUrl =
      "http://192.168.1.5:3000/api/registration/registrar";

  @override
  void initState() {
    super.initState();
    fetchDetails();
  }

  Future<void> fetchDetails() async {
    try {
      final response = await http.get(
        Uri.parse("$baseUrl/${widget.id}"),
        headers: {"Content-Type": "application/json"},
      );

      final res = jsonDecode(response.body);

      if (res['success'] == true) {
        setState(() {
          data = res['data'];
          loading = false;
        });
      } else {
        throw Exception("Failed to load");
      }
    } catch (e) {
      setState(() => loading = false);
    }
  }

  Future<void> approve() async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/${widget.id}/approve"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "studentId": 1, // TEMP 
        }),
      );

      final res = jsonDecode(response.body);

      if (res['success'] == true) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Approved successfully")),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: $e")),
      );
    }
  }

  Future<void> reject() async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/${widget.id}/reject"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "reason": "Rejected from details page",
          "requestCorrection": false,
        }),
      );

      final res = jsonDecode(response.body);

      if (res['success'] == true) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Rejected")),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: $e")),
      );
    }
  }

  //
  

  Widget infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$label: ",
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF6F8FB),

      appBar: AppBar(
        title: const Text("Registration Details"),
        backgroundColor: Colors.blue,
      ),

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : data == null
              ? const Center(child: Text("No data found"))
              : Padding(
                  padding: const EdgeInsets.all(20),
                  child: SingleChildScrollView(
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            data!['registration']?['fullName'] ?? '',
                            style: const TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),

                          const SizedBox(height: 20),

                          infoRow("Email",
                              data!['registration']?['email'] ?? ''),
                          infoRow("Phone",
                              data!['registration']?['phoneNo'] ?? ''),
                          infoRow("National ID",
                              data!['registration']?['nationalId'] ?? ''),
                          infoRow("Student Name",
                              data!['registration']?['studentName'] ?? ''),
                          infoRow("Status",
                              data!['registration']?['status'] ?? ''),

                          const SizedBox(height: 30),

                          const Text(
                            "Student Info",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),

                          const SizedBox(height: 10),

                          infoRow("Student ID",
                              data!['student']?['studentId']?.toString() ??
                                  'Not linked'),

                          const SizedBox(height: 40),

                          Row(
                            children: [
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: approve,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.green,
                                    padding: const EdgeInsets.all(15),
                                  ),
                                  child: const Text("Approve"),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: reject,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.red,
                                    padding: const EdgeInsets.all(15),
                                  ),
                                  child: const Text("Reject"),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
    );
  }
}