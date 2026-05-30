import 'package:flutter/material.dart';
import 'screens/home_page.dart';
import 'screens/login_page.dart';
import 'screens/parent/parent_dashboard.dart';
import 'screens/teacher/teacher_dashboard.dart';
import 'screens/registrar/registrar_dashboard.dart';
import 'screens/director/director_dashboard.dart';
import 'screens/parent/register_page.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Digital School',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomePage(),
        '/login': (context) => const LoginPage(),
        '/register': (context) => const ParentRegisterPage(),
        '/parent-dashboard': (context) => const ParentDashboard(),
        '/teacher-dashboard': (context) => const TeacherDashboard(),
        '/registrar-dashboard': (context) => const RegistrarDashboard(),
        '/director-dashboard': (context) => const DirectorDashboard(),
      },
      // Add this to handle unknown routes
      onUnknownRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) => const HomePage(),
        );
      },
    );
  }
}