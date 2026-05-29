import 'package:flutter/material.dart';
import '../home_page.dart';

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
      {
        "user": "System",
        "action": "Emergency Alert Sent",
        "time": "1 day ago",
      },
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
              // go to notifications page
            },
            child: const Text(
              "Notifications",
              style: TextStyle(color: Colors.white),
            ),
          ),

          TextButton(
            onPressed: () {
              // go to events page
            },
            child: const Text(
              "Events",
              style: TextStyle(color: Colors.white),
            ),
          ),

          TextButton(
            onPressed: () {
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(
                  builder: (context) => const HomePage(),
                ),
                (route) => false,
              );
            },
            child: const Text(
              "Logout",
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            // ================= HEADER =================
            Container(
              padding: const EdgeInsets.all(25),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [
                    Color(0xFF4F46E5),
                    Color(0xFF06B6D4),
                  ],
                ),
                borderRadius: BorderRadius.circular(25),
              ),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 30,
                    backgroundColor: Colors.white,
                    child: Icon(
                      Icons.admin_panel_settings,
                      color: Colors.blue,
                      size: 35,
                    ),
                  ),

                  const SizedBox(width: 20),

                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Welcome Director",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        SizedBox(height: 5),

                        Text(
                          "Monitor school performance and activities.",
                          style: TextStyle(
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 25),

            // ================= STATS =================
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: stats.length,
              gridDelegate:
                  const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 15,
                mainAxisSpacing: 15,
                childAspectRatio: 1.3,
              ),
              itemBuilder: (context, index) {
                final stat = stats[index];

                return Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.05),
                        blurRadius: 10,
                      ),
                    ],
                  ),

                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(
                        stat['icon'],
                        color: stat['color'],
                        size: 35,
                      ),

                      const Spacer(),

                      Text(
                        stat['value'],
                        style: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 5),

                      Text(
                        stat['title'],
                        style: const TextStyle(
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),

            const SizedBox(height: 30),

            // ================= PERFORMANCE =================
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(25),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 10,
                  ),
                ],
              ),

              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [

                  const Text(
                    "Classroom Performance",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 20),

                  ...performance.map((item) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 18),

                      child: Column(
                        crossAxisAlignment:
                            CrossAxisAlignment.start,
                        children: [

                          Row(
                            mainAxisAlignment:
                                MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                item['class'].toString(),
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),

                              Text(
                                "${item['score']}%",
                              ),
                            ],
                          ),

                          const SizedBox(height: 8),

                          LinearProgressIndicator(
                            value:
                                item['score'] / 100,
                            minHeight: 10,
                            borderRadius:
                                BorderRadius.circular(20),
                            backgroundColor:
                                Colors.grey.shade300,
                            color: Colors.blue,
                          ),
                        ],
                      ),
                    );
                  })
                ],
              ),
            ),

            const SizedBox(height: 30),

            // ================= QUICK ACTIONS =================
            Row(
              children: [

                Expanded(
                  child: _actionCard(
                    icon: Icons.warning,
                    color: Colors.red,
                    title: "Emergency",
                    subtitle: "Notify all parents",
                  ),
                ),

                const SizedBox(width: 15),

                Expanded(
                  child: _actionCard(
                    icon: Icons.campaign,
                    color: Colors.green,
                    title: "Broadcast",
                    subtitle: "Send announcements",
                  ),
                ),
              ],
            ),

            const SizedBox(height: 30),

            // ================= RECENT ACTIVITY =================
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(25),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 10,
                  ),
                ],
              ),

              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [

                  const Text(
                    "Recent Activity",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 20),

                  ...activities.map((activity) {
                    return ListTile(
                      contentPadding: EdgeInsets.zero,

                      leading: CircleAvatar(
                        backgroundColor:
                            Colors.blue.shade100,
                        child: const Icon(
                          Icons.notifications,
                          color: Colors.blue,
                        ),
                      ),

                      title: Text(
                        activity['user']!,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      subtitle: Text(activity['action']!),

                      trailing: Text(
                        activity['time']!,
                        style: const TextStyle(
                          color: Colors.grey,
                          fontSize: 12,
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _actionCard({
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),

        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
          ),
        ],
      ),

      child: Column(
        children: [

          CircleAvatar(
            radius: 28,
            backgroundColor: color.withValues(alpha: 0.15),

            child: Icon(
              icon,
              color: color,
              size: 28,
            ),
          ),

          const SizedBox(height: 15),

          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18,
            ),
          ),

          const SizedBox(height: 5),

          Text(
            subtitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.grey,
            ),
          ),
        ],
      ),
    );
  }
}