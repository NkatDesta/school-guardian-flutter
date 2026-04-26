import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { UserModel } from './User';

export interface HomeworkViewCreationAttributes extends Optional<any, 'viewId' | 'viewedAt'> {
  homeworkId: number;
  guardianId: number;
}

export class HomeworkViewModel extends Model<HomeworkViewCreationAttributes> {
  public viewId!: number;
  public homeworkId!: number;
  public guardianId!: number;
  public viewedAt!: Date;

  // Associations
  public homework?: any;
  public guardian?: any;
}

HomeworkViewModel.init(
  {
    viewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'view_id'
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
    viewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'viewed_at'
    }
  },
  {
    sequelize,
    tableName: 'HomeworkViews',
    modelName: 'HomeworkView',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['homework_id', 'guardian_id']
      }
    ]
  }
);

// Define associations
HomeworkViewModel.belongsTo(UserModel, { foreignKey: 'guardianId', as: 'guardian' });

export { HomeworkViewModel as HomeworkView };
