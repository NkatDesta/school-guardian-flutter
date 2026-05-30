class NotificationModel {
  final String? notificationId;
  final String title;
  final String message;
  final String priority;
  final String? recipientGroup;
  final String createdBy;
  final String? createdAt;

  NotificationModel({
    this.notificationId,
    required this.title,
    required this.message,
    required this.priority,
    this.recipientGroup,
    required this.createdBy,
    this.createdAt,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    print("🔍 Parsing notification: $json");
    
    // Handle both camelCase and snake_case from backend
    return NotificationModel(
      notificationId: (json['notificationId'] ?? json['notification_id'] ?? json['id'])?.toString(),
      title: json['title']?.toString() ?? 'No Title',
      message: json['content']?.toString() ?? json['message']?.toString() ?? 'No content',
      priority: json['priority']?.toString() ?? 'normal',
      recipientGroup: json['recipientGroup']?.toString() ?? json['recipient_group']?.toString(),
      createdBy: _extractSenderName(json),
      createdAt: json['createdAt']?.toString() ?? json['created_at']?.toString(),
    );
  }

  static String _extractSenderName(Map<String, dynamic> json) {
    // Handle nested sender object (from your SQL query)
    if (json['sender'] != null && json['sender'] is Map) {
      final sender = json['sender'] as Map;
      return sender['fullName']?.toString() ?? 
             sender['full_name']?.toString() ?? 
             sender['name']?.toString() ?? 
             'System';
    }
    
    // Handle flat sender field
    if (json['sender_fullName'] != null) {
      return json['sender_fullName'].toString();
    }
    
    // Handle createdBy field
    if (json['createdBy'] != null) {
      return json['createdBy'].toString();
    }
    
    // Default
    return 'System';
  }

  Map<String, dynamic> toJson() {
    return {
      'notificationId': notificationId,
      'title': title,
      'content': message,
      'priority': priority,
      'recipientGroup': recipientGroup,
    };
  }
}