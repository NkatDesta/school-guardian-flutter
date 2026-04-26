import { UserRole } from '../types';

export const constants = {
  ROLES: {
    DIRECTOR: 'director',
    REGISTRAR: 'registrar',
    TEACHER: 'teacher',
    HOMEROOM_TEACHER: 'homeroom_teacher',
    GUARDIAN: 'guardian'
  } as const,
  
  MESSAGE_TYPES: {
    HOMEWORK: 'homework',
    GENERAL: 'general',
    REPORT_CARD: 'report_card',
    PICKUP: 'pickup'
  } as const,
  
  NOTIFICATION_PRIORITY: {
    NORMAL: 'normal',
    EMERGENCY: 'emergency'
  } as const,
  
  EVENT_TYPES: {
    EXAM: 'exam',
    MEETING: 'meeting',
    HOLIDAY: 'holiday',
    ACTIVITY: 'activity',
    OTHER: 'other'
  } as const
};

export const getRoleDisplayName = (role: string): string => {
  const roleNames: Record<string, string> = {
    [constants.ROLES.DIRECTOR]: 'Director',
    [constants.ROLES.REGISTRAR]: 'Registrar',
    [constants.ROLES.TEACHER]: 'Subject Teacher',
    [constants.ROLES.HOMEROOM_TEACHER]: 'Homeroom Teacher',
    [constants.ROLES.GUARDIAN]: 'Guardian'
  };
  
  return roleNames[role] || role;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
