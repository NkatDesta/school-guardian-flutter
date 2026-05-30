import 'package:flutter/material.dart';
import '../home_page.dart';
import '../notifications/notification_page.dart';
import '../events/events_page.dart';

class TeacherDashboard extends StatelessWidget {
  const TeacherDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final assignments = [
      {"title": "Mathematics Homework", "class": "Grade 5", "due": "Tomorrow"},
      {"title": "Science Project", "class": "Grade 6", "due": "Friday"},
    ];

    return Scaffold(
      backgroundColor: const Color(0xFFF6F8FB),

      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.blue,

        title: const Text(
          "Teacher Dashboard",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),

        actions: [
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const NotificationsPage(role: "teacher"),
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
                  builder: (context) => const EventsPage(role: 'teacher'),
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
            Container(
              padding: const EdgeInsets.all(25),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(25),
                gradient: const LinearGradient(
                  colors: [Color(0xFF4F46E5), Color(0xFF7C3AED)],
                ),
              ),

              child: const Row(
                children: [
                  CircleAvatar(
                    radius: 30,
                    backgroundColor: Colors.white,
                    child: Icon(Icons.school, color: Colors.indigo, size: 35),
                  ),

                  SizedBox(width: 20),

                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Welcome Teacher",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        SizedBox(height: 5),

                        Text(
                          "Manage classes and assignments.",
                          style: TextStyle(color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 25),

            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 15,
              mainAxisSpacing: 15,
              childAspectRatio: 1.3,

              children: [
                _statCard("Classes", "8", Icons.class_, Colors.blue),
                _statCard("Students", "240", Icons.people, Colors.green),
                _statCard("Assignments", "18", Icons.book, Colors.orange),
                _statCard("Attendance", "92%", Icons.check, Colors.red),
              ],
            ),

            const SizedBox(height: 30),

            const Text(
              "Recent Assignments",
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 20),

            ...assignments.map((item) {
              return Card(
                margin: const EdgeInsets.only(bottom: 15),

                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),

                child: ListTile(
                  leading: const CircleAvatar(child: Icon(Icons.assignment)),

                  title: Text(item["title"]!),

                  subtitle: Text("${item["class"]} • Due ${item["due"]}"),

                  trailing: const Icon(Icons.arrow_forward_ios),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget _statCard(String title, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),

      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 35),

          const Spacer(),

          Text(
            value,
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),

          Text(title, style: const TextStyle(color: Colors.grey)),
        ],
      ),
    );
  }
}
