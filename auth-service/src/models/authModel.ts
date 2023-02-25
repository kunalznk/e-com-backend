import sequelize from "../config/db";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, UUIDV4 } from "sequelize"

export enum ROLE {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  DELIVERY_PARTNER = "DELIVERY_PARTNER"
}
class Auth extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>>{
  declare id: CreationOptional<number>;
  declare emailId: string;
  declare password: string;
  declare phoneNumber: string;
  declare role: ROLE;
  declare otp: number;
  declare isVerified: CreationOptional<boolean>;
  declare expiresAt: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}

export default Auth.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  emailId: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  role: {
    type: DataTypes.ENUM("CUSTOMER","SELLER","DELIVERY_PARTNER"),
    allowNull: false
  },
  otp: {
    type: DataTypes.INTEGER.UNSIGNED,
  }, 
  expiresAt: {
    type: DataTypes.DATE
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  createdAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt:{
    type: DataTypes.DATE
  }
} , {
  sequelize,
  tableName: 'auths'
  
})
