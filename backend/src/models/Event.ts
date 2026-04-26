import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { Event } from '../types';

interface EventCreationAttributes extends Optional<Event, 'eventId' | 'createdAt' | 'updatedAt' | 'isActive'> {}

export class EventModel extends Model<Event, EventCreationAttributes> implements Event {
  public eventId!: number;
  public title!: string;
  public description!: string;
  public eventDate!: Date;
  public eventType!: 'exam' | 'meeting' | 'holiday' | 'activity' | 'other';
  public location?: string;
  public createdBy!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public isActive!: boolean;
  public targetAudience!: 'all' | 'guardians_only' | 'teachers_only' | 'specific_class';
}

EventModel.init(
  {
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'event_id',
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'title',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description',
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'event_date',
    },
    eventType: {
      type: DataTypes.ENUM('exam', 'meeting', 'holiday', 'activity', 'other'),
      allowNull: false,
      field: 'event_type',
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'location',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    targetAudience: {
      type: DataTypes.ENUM('all', 'guardians_only', 'teachers_only', 'specific_class'),
      allowNull: false,
      defaultValue: 'all',
      field: 'target_audience',
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'Events',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

import { UserModel } from './User';

// Define associations
EventModel.belongsTo(UserModel, {
  foreignKey: 'createdBy',
  as: 'creator'
});

export default EventModel;
