const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ProductCategoryGender extends Model {}

ProductCategoryGender.init(
  { id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
    product_category_gender_name: { 
      type: DataTypes.STRING(10), 
      allowNull: false,
    },
    product_category_gender_image: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_category_gender',
  }
);

module.exports = ProductCategoryGender;
