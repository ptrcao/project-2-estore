// FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
// https://code.tutsplus.com/articles/sql-for-beginners-part-3-database-relationships--net-8561

const moment = require('moment-timezone');

// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Order extends Model {}

// set up fields and rules for Product model
Order.init(
  {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
    },

    order_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
        get() {
          // convert to Australian Eastern Standard Time
          return moment.utc(this.getDataValue('createdAt')).tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss');
        }
      },
    billing_address_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'billing_address',
            key: 'id'
        },
        // index: true // Add this line to create an index on the column
        },
    shipping_address_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'shipping_address',
        key: 'id'
    },
    // index: true // Add this line to create an index on the column
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'customer',
            key: 'id'
        }
        },

    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
    indexes: [
      {
        name: 'billing_address_id_index',
        fields: ['billing_address_id']
      },
      {
        name: 'shipping_address_id_index',
        fields: ['shipping_address_id']
      }
    ]
  }
);

// Do I need to add a foreign reference and model to the init statement?

// No, you do not need to add a foreign reference and model to the Product init statement to link the order table to the order_product table. Instead, you would add the orderId column to the OrderProduct table and then define the association between the Order and Product models through the OrderProduct model using the belongsTo and hasMany associations.

module.exports = Order;