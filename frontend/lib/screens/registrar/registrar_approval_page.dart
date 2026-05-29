import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class RegistrarApprovalPage extends StatefulWidget {
  const RegistrarApprovalPage({super.key});

  @override
  State<RegistrarApprovalPage> createState() => _RegistrarApprovalPageState();
}

class _RegistrarApprovalPageState extends State<RegistrarApprovalPage> {
  final String baseUrl = "http://192.168.1.5:3000/api";

  bool loading = false;
  List registrations = [];

  int pending = 0;
  int approved = 0;
  int rejected = 0;

  @override
  void initState() {
    super.initState();
    loadData();
  }

  // ================= LOAD EVERYTHING =================
  Future<void> loadData() async {
    await fetchPending();
    await fetchStats();
  }

  // ================= FETCH PENDING =================
  Future<void> fetchPending() async {
    setState(() => loading = true);

    try {
      final res = await http.get(
        Uri.parse("$baseUrl/registration/registrar/pending?status=pending"),
      );

      final data = jsonDecode(res.body);

      if (data["success"] == true) {
        setState(() {
          registrations = data["data"]["registrations"];
        });
      }
    } catch (e) {
      debugPrint("Error: $e");
    }

    setState(() => loading = false);
  }

  // ================= FETCH STATS =================
  Future<void> fetchStats() async {
    try {
      final res = await http.get(
        Uri.parse("$baseUrl/registration/registrar/stats"),
      );

      final data = jsonDecode(res.body);

      if (data["success"] == true) {
        setState(() {
          pending = data["data"]["totalPending"];
          approved = data["data"]["totalApproved"];
          rejected = data["data"]["totalRejected"];
        });
      }
    } catch (e) {
      debugPrint("Stats error: $e");
    }
  }

  // ================= STUDENT SEARCH DIALOG =================
  Future<String?> selectStudent() async {
    TextEditingController searchController = TextEditingController();
    List students = [];

    return showDialog<String>(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setStateDialog) {
            Future<void> search(String query) async {
              final res = await http.get(
                Uri.parse("$baseUrl/registration/registrar/students/search?query=$query"),
              );

              final data = jsonDecode(res.body);

              if (data["success"] == true) {
                setStateDialog(() {
                  students = data["data"];
                });
              }
            }

            return AlertDialog(
              title: const Text("Select Student"),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: searchController,
                    decoration: const InputDecoration(
                      hintText: "Search student",
                    ),
                    onChanged: search,
                  ),
                  const SizedBox(height: 10),

                  SizedBox(
                    height: 200,
                    width: 300,
                    child: ListView.builder(
                      itemCount: students.length,
                      itemBuilder: (context, index) {
                        final s = students[index];
                        return ListTile(
                          title: Text(s["fullName"]),
                          onTap: () {
                            Navigator.pop(context, s["studentId"].toString());
                          },
                        );
                      },
                    ),
                  )
                ],
              ),
            );
          },
        );
      },
    );
  }

  // ================= APPROVE =================
  Future<void> approve(String id) async {
    final studentId = await selectStudent();
    if (studentId == null) return;

    final res = await http.post(
      Uri.parse("$baseUrl/registration/registrar/$id/approve"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"studentId": studentId}),
    );

    final data = jsonDecode(res.body);

    if (data["success"] == true) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Approved successfully")),
      );
      loadData();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(data["error"]["message"])),
      );
    }
  }

  // ================= REJECT =================
  Future<void> reject(String id) async {
    final reasonController = TextEditingController();

    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Reject Registration"),
        content: TextField(
          controller: reasonController,
          decoration: const InputDecoration(
            hintText: "Enter reason",
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text("Reject"),
          ),
        ],
      ),
    );

    if (confirm != true) return;

    final res = await http.post(
      Uri.parse("$baseUrl/registration/registrar/$id/reject"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "reason": reasonController.text,
        "requestCorrection": false
      }),
    );

    final data = jsonDecode(res.body);

    if (data["success"] == true) {
      loadData();
    }
  }

  // ================= UI =================
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Registrar Dashboard"),
        backgroundColor: Colors.blue,
      ),

      body: RefreshIndicator(
        onRefresh: loadData,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [

            // ================= STATS =================
            Row(
              children: [
                statCard("Pending", pending, Colors.orange),
                statCard("Approved", approved, Colors.green),
                statCard("Rejected", rejected, Colors.red),
              ],
            ),

            const SizedBox(height: 20),

            const Text(
              "Pending Registrations",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 10),

            loading
                ? const Center(child: CircularProgressIndicator())
                : registrations.isEmpty
                    ? const Text("No pending registrations")
                    : Column(
                        children: registrations.map((reg) {
                          return Card(
                            child: ListTile(
                              title: Text(reg["fullName"] ?? ""),
                              subtitle: Text(reg["email"] ?? ""),
                              trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  IconButton(
                                    icon: const Icon(Icons.close, color: Colors.red),
                                    onPressed: () => reject(reg["registrationId"]),
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.check, color: Colors.green),
                                    onPressed: () => approve(reg["registrationId"]),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                      ),
          ],
        ),
      ),
    );
  }

  // ================= STAT CARD =================
  Widget statCard(String title, int value, Color color) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.all(6),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Text(
              value.toString(),
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            Text(title),
          ],
        ),
      ),
    );
  }
}