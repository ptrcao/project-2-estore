// import important parts of sequelize library
<<<<<<< HEAD
const { Model, DataTypes, DECIMAL } = require('sequelize');
=======
const { Model, DataTypes } = require('sequelize');
>>>>>>> 94d00078959aeb56412fba15702e503ede884e3c
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
<<<<<<< HEAD
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
      },
  
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: String
    },
  
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: DECIMAL
    },
  
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 10,
      validate: {
        isNumeric: true
      },
    },
  
    category_id: {
      type: DataTypes.INTEGER,
      referances: {
        model: 'category',
        key: 'id',
      }
    },
=======
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isNumeric: true,
      },
    },
    image_url: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    // This column will store a reference of the `id` of the `Category` that subsumes this product
    product_category_id: {
      type: DataTypes.INTEGER,
      references: {
        // This references the `category` model, which we set in `Category.js` as its 
        model: 'product_category',
        key: 'id',
      },
    },
    
>>>>>>> 94d00078959aeb56412fba15702e503ede884e3c
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

<<<<<<< HEAD
module.exports = Product;
=======
module.exports = Product;
>>>>>>> 94d00078959aeb56412fba15702e503ede884e3c
