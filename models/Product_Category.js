const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ProductCategory extends Model {}

ProductCategory.init(
  { id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
    product_category_name: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: 'Uncategorized' 
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_category',
  }
);

module.exports = ProductCategory;
