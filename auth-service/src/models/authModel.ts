import sequelize from "../config/db";
import { DataTypes } from "sequelize"

const Auth = sequelize.define('Auth', {
    emailId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
    role: {
      type: DataTypes.TINYINT,
      allowNull:false
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:true
    },
    otp : {
        type: DataTypes.TINYINT,
        allowNull:true
    },
    expiresAt : {
        type: DataTypes.DATE,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
  }, {
    tableName: 'Auth',
});


export default Auth;