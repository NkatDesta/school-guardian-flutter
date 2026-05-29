import 'package:flutter/material.dart';
import 'login_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey homeKey = GlobalKey();
  final GlobalKey aboutKey = GlobalKey();
  final GlobalKey missionKey = GlobalKey();
  final GlobalKey featuresKey = GlobalKey();
  final GlobalKey contactKey = GlobalKey();

  void scrollTo(GlobalKey key) {
    Scrollable.ensureVisible(
      key.currentContext!,
      duration: const Duration(milliseconds: 700),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 246, 246, 251),

      // ================= APP BAR =================
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        title: const Text(
          "Digital School",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        iconTheme: const IconThemeData(color: Colors.black),
        actions: [
          _navItem("Home", homeKey),
          _navItem("About", aboutKey),
          _navItem("Features", featuresKey),
          _navItem("Contact", contactKey),

          const SizedBox(width: 10),

          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const LoginPage()),
                );
              },
              child: const Text("Sign In", style: TextStyle(color: Colors.blue))
              
            ),
          ),
        ],
      ),

      // ================= BODY =================
      body: SingleChildScrollView(
        child: Column(
          children: [
            // ================= HERO =================
            Container(
              key: homeKey,
              width: double.infinity,
              padding: const EdgeInsets.all(50),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF4F46E5), Color(0xFF06B6D4)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: const Column(
                children: [
                  Icon(Icons.school, size: 90, color: Colors.white),
                  SizedBox(height: 20),
                  Text(
                    "Digital Parent-School Communication",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 10),
                  Text(
                    "A secure platform connecting parents, teachers, and administrators.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white70),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 30),

            // ================= ABOUT =================
            _section(
              key: aboutKey,
              title: "About Us",
              child: const Text(
                "The system strengthens communication between parents and schools, "
                "ensuring transparency, accountability, and real-time updates.",
                textAlign: TextAlign.center,
              ),
            ),

            // ================= MISSION & VISION =================
            _section(
              key: missionKey,
              title: "Mission & Vision",
              child: Row(
                children: [
                  // Vision
                  Expanded(
                    child: _card(
                      icon: Icons.visibility,
                      title: "Our Vision",
                      color: Colors.blue,
                      children: [
                        const Text(
                          "To enhance parental involvement and improve communication "
                          "between schools and families for better student success.",
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(width: 15),

                  // Mission
                  Expanded(
                    child: _card(
                      icon: Icons.rocket_launch,
                      title: "Our Mission",
                      color: Colors.blue,
                      children: const [
                        Text("• Provide secure guardian access"),
                        Text("• Improve teacher communication"),
                        Text("• Support school administration"),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // ================= FEATURES =================
            _section(
              key: featuresKey,
              title: "Features",
              child: Column(
                children: const [
                  _feature(
                    icon: Icons.people,
                    title: "Guardian Access",
                    subtitle: "View student progress and updates",
                  ),
                  _feature(
                    icon: Icons.message,
                    title: "Teacher Tools",
                    subtitle: "Send messages and assignments",
                  ),
                  _feature(
                    icon: Icons.security,
                    title: "Admin Control",
                    subtitle: "Manage system securely",
                  ),
                ],
              ),
            ),

            // ================= CONTACT =================
            _section(
              key: contactKey,
              title: "Contact",
              child: const Column(
                children: [
                  Text("Hawi Dandi Boru School"),
                  SizedBox(height: 5),
                  Text("+251 123 456 789"),
                  SizedBox(height: 5),
                  Text("info@school.edu"),
                ],
              ),
            ),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  // ================= NAV ITEM =================
  Widget _navItem(String text, GlobalKey key) {
    return TextButton(
      onPressed: () => scrollTo(key),
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.black87,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  // ================= SECTION WRAPPER =================
  Widget _section({
    required GlobalKey key,
    required String title,
    required Widget child,
  }) {
    return Container(
      key: key,
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 12),
        ],
      ),
      child: Column(
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 15),
          child,
        ],
      ),
    );
  }

  // ================= UNIFIED CARD =================
  Widget _card({
    required IconData icon,
    required String title,
    required Color color,
    String? content,
    List<Widget>? children,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 10),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 30),
          const SizedBox(height: 10),
          Text(
            title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),
          if (content != null)
            Text(content, style: const TextStyle(color: Colors.grey)),
          ...?children,
        ],
      ),
    );
  }
}

// ================= FEATURE WIDGET =================
class _feature extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _feature({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Row(
        children: [
          Icon(icon, color: Colors.indigo),
          const SizedBox(width: 15),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(
                subtitle,
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
