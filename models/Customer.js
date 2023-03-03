const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Relationships: https://code.tutsplus.com/articles/sql-for-beginners-part-3-database-relationships--net-8561

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    customer_last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    customer_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    customer_phone_number: {
        type: DataTypes.STRING(10),
        // string is good practice and avoids problems: https://stackoverflow.com/a/24353813/9095603
        // 10 is the longest AU number, being the 1800 number with 10 digits
        allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'customer',
  }
);

module.exports = Customer;