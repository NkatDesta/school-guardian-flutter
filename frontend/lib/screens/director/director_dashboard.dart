import 'package:flutter/material.dart';
import '../home_page.dart';
import '../notifications/notification_page.dart';
import '../events/events_page.dart';

class DirectorDashboard extends StatelessWidget {
  const DirectorDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> stats = [
      {
        "title": "Active Students",
        "value": "124",
        "icon": Icons.people,
        "color": Colors.blue,
      },
      {
        "title": "Guardians Joined",
        "value": "88",
        "icon": Icons.shield,
        "color": Colors.green,
      },
      {
        "title": "Staff Members",
        "value": "15",
        "icon": Icons.school,
        "color": Colors.orange,
      },
      {
        "title": "Pending Reports",
        "value": "12",
        "icon": Icons.warning,
        "color": Colors.red,
      },
    ];

    final List<Map<String, dynamic>> performance = [
      {"class": "KG-A", "score": 88},
      {"class": "KG-B", "score": 82},
      {"class": "Grade 1", "score": 91},
      {"class": "Grade 2", "score": 78},
      {"class": "Grade 3", "score": 85},
    ];

    final List<Map<String, String>> activities = [
      {
        "user": "Abebe Kebede",
        "action": "Approved Report Card",
        "time": "2h ago",
      },
      {
        "user": "Sarah Johnson",
        "action": "Created Science Fair Event",
        "time": "5h ago",
      },
      {"user": "System", "action": "Emergency Alert Sent", "time": "1 day ago"},
    ];

    return Scaffold(
      backgroundColor: const Color(0xFFF6F8FB),
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.blue,
        title: const Text(
          "Director Dashboard",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const NotificationsPage(role: "director"),
                ),
              );
            },
            child: const Text("Notifications", style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const EventsPage(role: 'director'),
                ),
              );
            },
            child: const Text("Events", style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => const HomePage()),
                (route) => false,
              );
            },
            child: const Text("Logout", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ... (rest of your body remains the same)
          ],
        ),
      ),
    );
  }

  // ... (rest of your methods remain the same)
}
