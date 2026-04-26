import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { Notification } from '../types/index';
import { UserModel } from './User';

interface NotificationCreationAttributes extends Optional<Notification, 'notificationId' | 'createdAt' | 'deliveryStatus' | 'sentAt'> {}

export class NotificationModel extends Model<Notification, NotificationCreationAttributes> implements Notification {
  public notificationId!: number;
  public title!: string;
  public content!: string;
  public priority!: 'normal' | 'emergency';
  public senderId!: number;
  public recipientGroup!: 'all_guardians' | 'all_teachers' | 'specific_class' | 'specific_users' | 'all';
  public createdAt!: Date;
  public scheduledFor?: Date;
  public sentAt?: Date;
  public deliveryStatus!: 'pending' | 'sent' | 'failed';
}

NotificationModel.init(
  {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'notification_id',
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('normal', 'emergency'),
      defaultValue: 'normal',
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sender_id',
    },
    recipientGroup: {
      type: DataTypes.ENUM('all_guardians', 'all_teachers', 'specific_class', 'specific_users', 'all'),
      allowNull: false,
      field: 'recipient_group',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    scheduledFor: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'scheduled_for',
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'sent_at',
    },
    deliveryStatus: {
      type: DataTypes.ENUM('pending', 'sent', 'failed'),
      defaultValue: 'pending',
      field: 'delivery_status',
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: false,
    underscored: true,
  }
);

// Define associations
NotificationModel.belongsTo(UserModel, { foreignKey: 'senderId', as: 'sender' });
UserModel.hasMany(NotificationModel, { foreignKey: 'senderId', as: 'sentNotifications' });
