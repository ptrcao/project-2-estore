// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class ShippingAddress extends Model {}

// set up fields and rules for Product model
ShippingAddress.init(
  {
      id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    receiver_first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    receiver_last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
      notEmpty: true,
      }
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    receiver_phone_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    address_line_1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address_line_2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // shipping_address_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "order",
    //     key: "shipping_address_id"
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shipping_address',
  }
);

module.exports = ShippingAddress;