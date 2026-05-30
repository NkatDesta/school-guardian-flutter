class EventModel {
  final String? eventId;
  final String title;
  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final String location;
  final String? eventType;
  final String? status;
  final String createdBy;
  final String? createdAt;
  final List<String>? targetGroups;

  EventModel({
    this.eventId,
    required this.title,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.location,
    this.eventType,
    this.status,
    required this.createdBy,
    this.createdAt,
    this.targetGroups,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      eventId: (json['eventId'] ?? json['event_id'] ?? json['id'])?.toString(),
      title: json['title']?.toString() ?? 'No Title',
      description: json['description']?.toString() ?? json['content']?.toString() ?? 'No description',
      startDate: _parseDateTime(json['startDate'] ?? json['start_date'] ?? json['startTime']),
      endDate: _parseDateTime(json['endDate'] ?? json['end_date'] ?? json['endTime']),
      location: json['location']?.toString() ?? 'TBD',
      eventType: json['eventType']?.toString() ?? json['event_type']?.toString() ?? 'general',
      status: json['status']?.toString() ?? 'upcoming',
      createdBy: _extractCreatorName(json),
      createdAt: json['createdAt']?.toString() ?? json['created_at']?.toString(),
      targetGroups: _extractTargetGroups(json),
    );
  }

  static DateTime _parseDateTime(dynamic dateTimeValue) {
    if (dateTimeValue == null) return DateTime.now();
    if (dateTimeValue is DateTime) return dateTimeValue;
    if (dateTimeValue is String) {
      try {
        return DateTime.parse(dateTimeValue);
      } catch (e) {
        return DateTime.now();
      }
    }
    return DateTime.now();
  }

  static String _extractCreatorName(Map<String, dynamic> json) {
    if (json['creator'] != null && json['creator'] is Map) {
      final creator = json['creator'] as Map;
      return creator['fullName']?.toString() ?? 
             creator['full_name']?.toString() ?? 
             creator['name']?.toString() ?? 
             'System';
    }
    
    if (json['createdBy'] != null) {
      return json['createdBy'].toString();
    }
    
    if (json['organizer'] != null) {
      return json['organizer'].toString();
    }
    
    return 'System';
  }

  static List<String> _extractTargetGroups(Map<String, dynamic> json) {
    final groups = <String>[];
    
    if (json['targetGroups'] != null && json['targetGroups'] is List) {
      for (var group in json['targetGroups']) {
        groups.add(group.toString());
      }
    } else if (json['target_groups'] != null && json['target_groups'] is List) {
      for (var group in json['target_groups']) {
        groups.add(group.toString());
      }
    } else if (json['recipientGroup'] != null) {
      groups.add(json['recipientGroup'].toString());
    }
    
    return groups;
  }

  bool get isOngoing {
    final now = DateTime.now();
    return now.isAfter(startDate) && now.isBefore(endDate);
  }

  bool get isUpcoming {
    return DateTime.now().isBefore(startDate);
  }

  bool get isPast {
    return DateTime.now().isAfter(endDate);
  }

  String getFormattedDateRange() {
    if (startDate.day == endDate.day && startDate.month == endDate.month) {
      return '${_formatDate(startDate)} (${_formatTime(startDate)} - ${_formatTime(endDate)})';
    }
    return '${_formatDate(startDate)} - ${_formatDate(endDate)}';
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }

  String _formatTime(DateTime date) {
    return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }
}