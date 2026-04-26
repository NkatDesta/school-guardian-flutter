import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { Homework } from '../types/index';

export interface HomeworkCreationAttributes extends Optional<Omit<Homework, 'homeworkId' | 'createdAt' | 'updatedAt'>, 'isActive'> {
  title: string;
  description: string;
  subject: string;
  className: string;
  teacherId: number;
  dueDate: Date;
  isActive: boolean;
}

export class HomeworkModel extends Model<Homework, HomeworkCreationAttributes> implements Homework {
  public homeworkId!: number;
  public title!: string;
  public description!: string;
  public subject!: string;
  public className!: string;
  public teacherId!: number;
  public dueDate!: Date;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

HomeworkModel.init(
  {
    homeworkId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'homework_id'
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'title'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description'
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'subject'
    },
    className: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'class_name'
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'teacher_id'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'due_date'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    tableName: 'Homework',
    modelName: 'Homework',
    underscored: true,
  }
);

export { HomeworkModel as Homework };
