// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class BillingAddress extends Model {}

BillingAddress.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },

      company_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
      // billing_address_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "order",
      //     key: "billing_address_id"
      //   },
      // },


    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "billing_address",
    }
  );

  module.exports = BillingAddress;