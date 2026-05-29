import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ParentRegisterPage extends StatefulWidget {
  const ParentRegisterPage({super.key});

  @override
  State<ParentRegisterPage> createState() => _ParentRegisterPageState();
}

class _ParentRegisterPageState extends State<ParentRegisterPage> {
  final _formKey = GlobalKey<FormState>();

  final fullNameController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final nationalIdController = TextEditingController();
  final studentNameController = TextEditingController();
  final passwordController = TextEditingController();

  String relationship = 'parent'; // ✅ Changed to lowercase
  bool loading = false;
  bool showPassword = false;

  PlatformFile? certificateFile;
  PlatformFile? idFrontFile;
  PlatformFile? idBackFile;

  Future<void> pickFile(String type) async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['jpg', 'png', 'jpeg', 'pdf'],
        withData: true,
      );

      if (result == null) return;

      setState(() {
        switch (type) {
          case 'certificate':
            certificateFile = result.files.first;
            break;
          case 'front':
            idFrontFile = result.files.first;
            break;
          case 'back':
            idBackFile = result.files.first;
            break;
        }
      });
    } catch (e) {
      print('Error picking file: $e');
    }
  }

  Future<void> submitRegistration() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (certificateFile == null || idFrontFile == null || idBackFile == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please upload all required documents'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() => loading = true);

    try {
      final uri = Uri.parse('http://localhost:3000/api/registration/simple-register');
      final request = http.MultipartRequest('POST', uri);

      // Add text fields
      request.fields['fullName'] = fullNameController.text.trim();
      request.fields['email'] = emailController.text.trim();
      request.fields['phoneNo'] = phoneController.text.trim();
      request.fields['nationalId'] = nationalIdController.text.trim();
      request.fields['studentName'] = studentNameController.text.trim();
      request.fields['relationshipType'] = relationship; // Now 'parent' or 'legal_guardian'
      request.fields['password'] = passwordController.text;

      // Add files
      request.files.add(http.MultipartFile.fromBytes(
        'certificate',
        certificateFile!.bytes!,
        filename: certificateFile!.name,
      ));
      request.files.add(http.MultipartFile.fromBytes(
        'idFront',
        idFrontFile!.bytes!,
        filename: idFrontFile!.name,
      ));
      request.files.add(http.MultipartFile.fromBytes(
        'idBack',
        idBackFile!.bytes!,
        filename: idBackFile!.name,
      ));

      final response = await request.send();
      final responseBody = await response.stream.bytesToString();
      final data = jsonDecode(responseBody);

      print('Status: ${response.statusCode}');
      print('Response: $responseBody');

      if (response.statusCode == 201 && data['success'] == true) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Registration submitted! Awaiting registrar approval.'),
            backgroundColor: Colors.green,
          ),
        );
        
        // Clear form
        fullNameController.clear();
        emailController.clear();
        phoneController.clear();
        nationalIdController.clear();
        studentNameController.clear();
        passwordController.clear();
        setState(() {
          certificateFile = null;
          idFrontFile = null;
          idBackFile = null;
          relationship = 'parent';
        });
        
        Future.delayed(const Duration(seconds: 2), () {
          if (mounted) Navigator.pop(context);
        });
      } else {
        throw Exception(data['error']?['message'] ?? 'Registration failed');
      }
    } catch (e) {
      print('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text(
          'Parent Registration',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Container(
            constraints: const BoxConstraints(maxWidth: 500),
            child: Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Center(
                        child: Column(
                          children: [
                            Icon(Icons.app_registration, size: 50, color: Colors.blue),
                            SizedBox(height: 10),
                            Text(
                              'Guardian Registration',
                              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 5),
                            Text(
                              'Register as a parent or legal guardian',
                              style: TextStyle(color: Colors.grey),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 30),
                      
                      const Text(
                        'Personal Information',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
                      ),
                      const SizedBox(height: 15),
                      
                      _buildTextField(
                        controller: fullNameController,
                        label: 'Full Name',
                        icon: Icons.person,
                      ),
                      _buildTextField(
                        controller: emailController,
                        label: 'Email Address',
                        icon: Icons.email,
                        keyboardType: TextInputType.emailAddress,
                      ),
                      _buildTextField(
                        controller: phoneController,
                        label: 'Phone Number',
                        icon: Icons.phone,
                        keyboardType: TextInputType.phone,
                      ),
                      _buildTextField(
                        controller: nationalIdController,
                        label: 'National ID',
                        icon: Icons.badge,
                      ),
                      
                      const SizedBox(height: 20),
                      const Divider(),
                      const SizedBox(height: 20),
                      
                      const Text(
                        'Student Information',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
                      ),
                      const SizedBox(height: 15),
                      
                      _buildTextField(
                        controller: studentNameController,
                        label: 'Student Name',
                        icon: Icons.school,
                      ),
                      
                      Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        child: DropdownButtonFormField(
                          initialValue: relationship,
                          decoration: InputDecoration(
                            labelText: 'Relationship',
                            prefixIcon: const Icon(Icons.family_restroom),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          items: const [
                            DropdownMenuItem(value: 'parent', child: Text('Parent')),
                            DropdownMenuItem(value: 'legal_guardian', child: Text('Legal Guardian')),
                          ],
                          onChanged: (value) {
                            setState(() => relationship = value.toString());
                          },
                        ),
                      ),
                      
                      const SizedBox(height: 20),
                      const Divider(),
                      const SizedBox(height: 20),
                      
                      const Text(
                        'Account Information',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
                      ),
                      const SizedBox(height: 15),
                      
                      _buildTextField(
                        controller: passwordController,
                        label: 'Password',
                        icon: Icons.lock,
                        obscure: !showPassword,
                        suffixIcon: IconButton(
                          icon: Icon(showPassword ? Icons.visibility_off : Icons.visibility),
                          onPressed: () => setState(() => showPassword = !showPassword),
                        ),
                      ),
                      
                      const SizedBox(height: 20),
                      const Divider(),
                      const SizedBox(height: 20),
                      
                      const Text(
                        'Required Documents',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
                      ),
                      const SizedBox(height: 10),
                      
                      _buildDocumentButton(
                        title: 'Birth Certificate',
                        file: certificateFile,
                        onTap: () => pickFile('certificate'),
                      ),
                      _buildDocumentButton(
                        title: 'ID Card - Front Side',
                        file: idFrontFile,
                        onTap: () => pickFile('front'),
                      ),
                      _buildDocumentButton(
                        title: 'ID Card - Back Side',
                        file: idBackFile,
                        onTap: () => pickFile('back'),
                      ),
                      
                      const SizedBox(height: 30),
                      
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: loading ? null : submitRegistration,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: loading
                              ? const SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                  ),
                                )
                              : const Text(
                                  'Submit Registration',
                                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                                ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    bool obscure = false,
    Widget? suffixIcon,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextFormField(
        controller: controller,
        obscureText: obscure,
        keyboardType: keyboardType,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'This field is required';
          }
          return null;
        },
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: Icon(icon),
          suffixIcon: suffixIcon,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.blue, width: 2),
          ),
        ),
      ),
    );
  }

  Widget _buildDocumentButton({
    required String title,
    required PlatformFile? file,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: OutlinedButton.icon(
        onPressed: onTap,
        icon: Icon(file != null ? Icons.check_circle : Icons.upload_file,
            color: file != null ? Colors.green : Colors.blue),
        label: Expanded(
          child: Text(
            file != null ? '$title: ${file.name}' : title,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        style: OutlinedButton.styleFrom(
          padding: const EdgeInsets.all(15),
          side: BorderSide(color: file != null ? Colors.green : Colors.grey),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    fullNameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    nationalIdController.dispose();
    studentNameController.dispose();
    passwordController.dispose();
    super.dispose();
  }
}