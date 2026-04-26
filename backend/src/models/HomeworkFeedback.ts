import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { UserModel } from './User';

export interface HomeworkFeedbackCreationAttributes extends Optional<any, 'feedbackId' | 'feedbackDate'> {
  homeworkId: number;
  guardianId: number;
  feedback?: string;
}

export class HomeworkFeedbackModel extends Model<HomeworkFeedbackCreationAttributes> {
  public feedbackId!: number;
  public homeworkId!: number;
  public guardianId!: number;
  public feedback!: string;
  public feedbackDate!: Date;

  // Associations
  public homework?: any;
  public guardian?: any;
}

HomeworkFeedbackModel.init(
  {
    feedbackId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'feedback_id'
    },
    homeworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'homework_id'
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'guardian_id'
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'feedback'
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'feedback_date'
    }
  },
  {
    sequelize,
    tableName: 'HomeworkFeedback',
    modelName: 'HomeworkFeedback',
    timestamps: false,
    underscored: true,
  }
);

// Define associations
HomeworkFeedbackModel.belongsTo(UserModel, { foreignKey: 'guardianId', as: 'guardian' });

export { HomeworkFeedbackModel as HomeworkFeedback };
