import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

interface OTPAttributes {
  id: number;
  identifier: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OTPCreationAttributes extends Optional<OTPAttributes, 'id' | 'attempts' | 'createdAt' | 'updatedAt'> {}

export class OTPModel extends Model<OTPAttributes, OTPCreationAttributes> implements OTPAttributes {
  public id!: number;
  public identifier!: string;
  public code!: string;
  public expiresAt!: Date;
  public attempts!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OTPModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identifier: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at',
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'OTP',
    tableName: 'OTPs',
    timestamps: true,
  }
);

export default OTPModel;
