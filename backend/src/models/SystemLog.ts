import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

interface SystemLogAttributes {
  logId: number;
  userId: number | null;
  action: string;
  tableName: string | null;
  recordId: number | null;
  oldValues: any | null;
  newValues: any | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

interface SystemLogCreationAttributes extends Optional<SystemLogAttributes, 'logId' | 'createdAt'> {}

export class SystemLogModel extends Model<SystemLogAttributes, SystemLogCreationAttributes> implements SystemLogAttributes {
  public logId!: number;
  public userId!: number | null;
  public action!: string;
  public tableName!: string | null;
  public recordId!: number | null;
  public oldValues!: any | null;
  public newValues!: any | null;
  public ipAddress!: string | null;
  public userAgent!: string | null;
  public createdAt!: Date;
  
  // Association - lazy loaded to avoid circular imports
  public user?: any;
}

SystemLogModel.init(
  {
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'log_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id',
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'action',
    },
    tableName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'table_name',
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'record_id',
    },
    oldValues: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'old_values',
    },
    newValues: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'new_values',
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'ip_address',
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_agent',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    sequelize,
    modelName: 'SystemLog',
    tableName: 'SystemLogs',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  }
);

// Define associations - lazy loaded to avoid circular imports
export const initSystemLogAssociations = () => {
  const { UserModel } = require('./User');
  SystemLogModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
  });
};

export default SystemLogModel;
