// import models
const BillingAddress = require('./Billing_Address');
const Customer = require('./Customer')
const OrderProduct = require('./Order_Product')
const Order = require('./Order')
const ProductCategory = require('./Product_Category');
const Product = require('./Product');
const ShippingAddress = require('./Shipping_Address');







// the relational term describing the tables is "one-to-many" as each shipping or billing address can be related to many orders, but each order can only be related to one shipping or billing address.
// the store would force customers to place multiple orders if wanting to ship to multiple addresses


// RELATIONSHIP between Order and Shipping Address

// In the ShippingAddress model
ShippingAddress.hasMany(Order, { foreignKey: 'shipping_address_id' });
// foreignKey option specifies the foreign key column in the `Order` table


// In the Order model
Order.belongsTo(ShippingAddress, { foreignKey: 'shipping_address_id' });
// foreignKey option specifies the foreign key column in the `Order` table



// RELATIONSHIP between Order and Billing Address

// In the BillingAddress model
BillingAddress.hasMany(Order, { foreignKey: 'billing_address_id' });
// foreignKey option specifies the foreign key column in the `Order` table

Order.belongsTo(BillingAddress, { foreignKey: 'billing_address_id' });
// foreignKey option specifies the foreign key column in the `Order` table


// RELATIONSHIP between Product and Product Category

Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id' });

ProductCategory.hasMany(Product, { foreignKey: 'product_category_id' });



// RELATIONSHIP between Order and Product (THROUGH OrderProduct table)

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'order_id'
    });

Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'product_id'
    });
// In these associations, the foreign key is in the OrderProduct table, which is the join table that connects Order and Product. So the foreignKey option in each association refers to the foreign key column in the OrderProduct table that relates to the corresponding model's primary key.

// By specifying the foreign keys in the through option, Sequelize will create the appropriate foreign key constraints in the join table (order_product), linking the order_id column to the orders table and the product_id column to the products table.



// Define association between OrderProduct (join table) and Product
OrderProduct.belongsTo(Product, {
    foreignKey: 'product_id'
    });
    Product.hasMany(OrderProduct, {
    foreignKey: 'product_id'
    });
    
// Define association between OrderProduct (join table) and Order
OrderProduct.belongsTo(Order, {
foreignKey: 'order_id'
});
Order.hasMany(OrderProduct, {
foreignKey: 'order_id'
});


// Define association between Customer and Order
Customer.hasMany(Order, {
    foreignKey: 'customer_id'
  });
  Order.belongsTo(Customer, {
    foreignKey: 'customer_id'
  });
  
  
  
  



// foreignKey option specifies the foreign key column in the `Order` table
// // Products belongsTo Product Category
// Product.belongsTo(Category, {
//     foreignKey: 'product_category_id',
//   })
// // Categories have many Products
//   Category.hasMany(Product,{
//     foreignKey: 'category_id'
//   })






  module.exports = {
    BillingAddress,
    Customer,
    OrderProduct,
    Order,
    Product,
    ProductCategory,
    OrderProduct
  };
