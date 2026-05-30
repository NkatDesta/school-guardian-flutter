import 'package:flutter/material.dart';
import '../../models/notification_model.dart';
import '../../services/notification_api.dart';

class NotificationsPage extends StatefulWidget {
  final String role;

  const NotificationsPage({super.key, required this.role});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  List<NotificationModel> notifications = [];
  bool loading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    loadNotifications();
  }

  Future<void> loadNotifications() async {
    setState(() {
      loading = true;
      errorMessage = null;
    });

    List<NotificationModel> loadedNotifications = [];
    String? loadError;

    try {
      loadedNotifications = await NotificationApi.getNotifications();
    } catch (error) {
      loadError = error.toString();
    }

    if (!mounted) return;

    setState(() {
      notifications = loadedNotifications;
      errorMessage = loadError;
      loading = false;
    });
  }

  Future<void> showCreateNotificationDialog() async {
    final titleController = TextEditingController();
    final contentController = TextEditingController();
    String priority = 'normal';
    String recipientGroup = 'all';

    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Create Notification'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleController,
                decoration: const InputDecoration(
                  labelText: 'Title',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: contentController,
                decoration: const InputDecoration(
                  labelText: 'Content',
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
              ),
              const SizedBox(height: 10),
              DropdownButtonFormField<String>(
                value: priority,
                decoration: const InputDecoration(
                  labelText: 'Priority',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'normal', child: Text('Normal')),
                  DropdownMenuItem(
                    value: 'emergency',
                    child: Text('Emergency'),
                  ),
                ],
                onChanged: (value) {
                  if (value != null) {
                    setState(() => priority = value);
                  }
                },
              ),
              const SizedBox(height: 10),
              DropdownButtonFormField<String>(
                value: recipientGroup,
                decoration: const InputDecoration(
                  labelText: 'Send to',
                  border: OutlineInputBorder(),
                ),
                items: [
                  const DropdownMenuItem(value: 'all', child: Text('Everyone')),
                  const DropdownMenuItem(
                    value: 'all_guardians',
                    child: Text('Parents/Guardians'),
                  ),
                  const DropdownMenuItem(
                    value: 'all_teachers',
                    child: Text('Teachers'),
                  ),
                  if (widget.role == 'director') ...[
                    const DropdownMenuItem(
                      value: 'registrar',
                      child: Text('Registrar Only'),
                    ),
                    const DropdownMenuItem(
                      value: 'director',
                      child: Text('Director Only'),
                    ),
                  ],
                ],
                onChanged: (value) {
                  if (value != null) {
                    setState(() => recipientGroup = value);
                  }
                },
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (titleController.text.isEmpty ||
                  contentController.text.isEmpty) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Please fill all fields')),
                );
                return;
              }

              Navigator.pop(context);

              try {
                await NotificationApi.createNotification(
                  title: titleController.text,
                  content: contentController.text,
                  priority: priority,
                  recipientGroup: recipientGroup,
                );

                if (!mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Notification created!')),
                );
                await loadNotifications();
              } catch (error) {
                if (!mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(error.toString()),
                    backgroundColor: Colors.red,
                  ),
                );
              }
            },
            child: const Text('Send'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        actions: [
          if (widget.role == 'director' || widget.role == 'registrar')
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: showCreateNotificationDialog,
              tooltip: 'Create Notification',
            ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: loadNotifications,
            tooltip: 'Refresh',
          ),
        ],
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : errorMessage != null
          ? Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      size: 64,
                      color: Colors.red,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Failed to load notifications',
                      style: Theme.of(context).textTheme.titleLarge,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      errorMessage ?? '',
                      style: const TextStyle(color: Colors.grey),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: loadNotifications,
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              ),
            )
          : notifications.isEmpty
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.notifications_none, size: 64, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('No notifications yet'),
                  SizedBox(height: 8),
                  Text(
                    'Notifications will appear here',
                    style: TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ],
              ),
            )
          : ListView.builder(
              itemCount: notifications.length,
              padding: const EdgeInsets.all(12),
              itemBuilder: (context, index) {
                final notification = notifications[index];
                final isEmergency = notification.priority == 'emergency';

                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  elevation: 2,
                  color: isEmergency ? Colors.red.shade50 : Colors.white,
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: isEmergency ? Colors.red : Colors.blue,
                      child: Icon(
                        isEmergency ? Icons.warning : Icons.notifications,
                        color: Colors.white,
                      ),
                    ),
                    title: Text(
                      notification.title,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: isEmergency ? Colors.red : Colors.black,
                      ),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(notification.message),
                        const SizedBox(height: 4),
                        Text(
                          'To: ${_getRecipientLabel(notification.recipientGroup)}',
                          style: const TextStyle(
                            fontSize: 11,
                            color: Colors.blue,
                          ),
                        ),
                        Text(
                          'From: ${notification.createdBy}',
                          style: const TextStyle(
                            fontSize: 11,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                    trailing: Text(
                      _formatDate(notification.createdAt),
                      style: const TextStyle(fontSize: 10, color: Colors.grey),
                    ),
                    onTap: () {
                      _showNotificationDetails(notification);
                    },
                  ),
                );
              },
            ),
    );
  }

  String _getRecipientLabel(String? group) {
    switch (group) {
      case 'all':
        return 'Everyone';
      case 'all_guardians':
        return 'Parents/Guardians';
      case 'all_teachers':
        return 'Teachers';
      case 'director':
        return 'Director Only';
      case 'registrar':
        return 'Registrar Only';
      default:
        return group ?? 'Unknown';
    }
  }

  void _showNotificationDetails(NotificationModel notification) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(
              notification.priority == 'emergency'
                  ? Icons.warning
                  : Icons.notifications,
              color: notification.priority == 'emergency'
                  ? Colors.red
                  : Colors.blue,
            ),
            const SizedBox(width: 10),
            Expanded(child: Text(notification.title)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(notification.message),
            const SizedBox(height: 16),
            Text(
              'Sent to: ${_getRecipientLabel(notification.recipientGroup)}',
              style: const TextStyle(fontSize: 12, color: Colors.blue),
            ),
            Text(
              'Sent by: ${notification.createdBy}',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
            Text(
              'Date: ${_formatDateTime(notification.createdAt)}',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  String _formatDate(String? dateString) {
    if (dateString == null) return '';
    try {
      final date = DateTime.parse(dateString);
      final now = DateTime.now();
      final difference = now.difference(date);

      if (difference.inDays > 0) {
        return '${difference.inDays}d ago';
      } else if (difference.inHours > 0) {
        return '${difference.inHours}h ago';
      } else if (difference.inMinutes > 0) {
        return '${difference.inMinutes}m ago';
      } else {
        return 'Just now';
      }
    } catch (e) {
      return '';
    }
  }

  String _formatDateTime(String? dateString) {
    if (dateString == null) return '';
    try {
      final date = DateTime.parse(dateString);
      return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
    } catch (e) {
      return '';
    }
  }
}
