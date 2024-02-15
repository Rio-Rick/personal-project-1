'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrytp');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order,{foreignKey : "UserId"})
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      unique : {
        msg : 'Email must be unique'
      },
      allowNull : false,
      validate : {
        notNull : {
          msg : "Email is required"
        },
        notEmpty : {
          msg : "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password:{
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password is required"
        },
        notEmpty : {
          msg : "Password is required"
        },
        len : {
          args : 5,
          msg : "minimum length is 5"
        }
      }
    },
    role: {
      type :  DataTypes.STRING,
      defaultValue : "user",
      allowNull : false,
      validate : {
        notNull : {
          msg : "role is required"
        },
        notEmpty : {
          msg : "role is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};