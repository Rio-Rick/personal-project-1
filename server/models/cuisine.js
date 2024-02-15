'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.hasMany(models.Order, {foreignKey : "FoodId"})
    }
  }
  Cuisine.init({
    name: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name is required"
        },
        notEmpty : {
          msg : "Name is required"
        }
      }
    },
    price: {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "price is required"
        },
        notEmpty : {
          msg : "price is required"
        }
      }
    },
    imageUrl: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Image Url is required"
        },
        notEmpty : {
          msg : "Image Url is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};