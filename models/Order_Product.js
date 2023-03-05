// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class OrderProduct extends Model {}

// order_id,product_id,quantity,price_override

// set up fields and rules for OrderProduct model
OrderProduct.init(
  {
    //   id: {
    //   type: DataTypes.INTEGER,
    //   // primaryKey: true,
    //   allowNull: false,
    //   // autoIncrement: true
    // },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
      isDecimal: true,
      }
    },

    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'order_product',
  }
);

module.exports = OrderProduct;