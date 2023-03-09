const sequelize = require('../config/connection');
const { readCSV } = require("../helpers/read_csv");

const path = require('path');

const { BillingAddress, 
    Customer,
    OrderProduct,
    Order,
    Product,
    ProductCategory
} = require('../models');


const ProductCategoryGender = require('../models/Product_Category_gender');
const ShippingAddress = require('../models/Shipping_Address');

const seedAll = async() => {

await sequelize.sync({ force: true });
console.log('\n----- DATABASE SYNCED -----\n');

// This will be more reliable
// const customerData = await readCSV(path.join(__dirname, 'csv', 'customer.csv'));
// than
// const customerData = await readCSV('./csv/customer.csv');
// across different OSs

// const customerData = await readCSV(path.join(__dirname, 'csv', 'customer.csv'));
// await Customer.bulkCreate(customerData);
// console.log('\n----- customer SEEDED -----\n');

// The error message indicates that you are still facing a foreign key constraint error in the order_product table. This error occurs when you try to add a row to the child table (order_product) that references a non-existent row in the parent table (order).

// You should check the order_id values in the order_product table and ensure that they correspond to valid id values in the order table. You should also check if the id values in the product table that are referenced by the order_product table are valid.

// It's also possible that the issue is due to the order in which the tables are seeded. You should ensure that the order table is seeded before the order_product table.

// Lastly, ensure that the order_product table is defined with the foreign key constraint properly referencing the id column in the order table.

// const billingAddressData = await readCSV(path.join(__dirname, 'csv', 'billing_address.csv'));
// await BillingAddress.bulkCreate(billingAddressData);
// console.log('\n----- billing_address SEEDED -----\n');

// const shippingAddressData = await readCSV(path.join(__dirname, 'csv', 'shipping_address.csv'));
// await ShippingAddress.bulkCreate(shippingAddressData);
// console.log('\n----- shipping_addresses SEEDED -----\n');

// const orderData = await readCSV(path.join(__dirname, 'csv', 'order.csv'));
// await Order.bulkCreate(orderData);
// console.log('\n----- order SEEDED -----\n');

// The problem was that the order table was being seeded before the billing_address table.

// Ah, I see. That makes sense. In that case, when the order table was being seeded, the foreign key constraint on the billing_address_id column was not being met because the corresponding data in the billing_address table did not exist yet. This would have caused the foreign key constraint error you were seeing.

// To fix the issue, the seeding order of the tables should be adjusted so that the tables are seeded in the correct order, starting with the parent tables and then moving on to the child tables.



const ProductCategoryGenderData = await readCSV(path.join(__dirname, 'csv', 'product_category_gender.csv'));
await ProductCategoryGender.bulkCreate(ProductCategoryGenderData);
console.log('\n----- product_category_gender SEEDED -----\n')

const productCategoryData = await readCSV(path.join(__dirname, 'csv', 'product_category.csv'));
await ProductCategory.bulkCreate(productCategoryData);
console.log('\n----- product_category SEEDED -----\n');

// Based on the foreign key constraint error message in the seed file, it seems that the product_category table should be seeded first, as it is referenced by the product table through its product_category_id column. Therefore, before any product can be inserted into the product table, the corresponding product category must already exist in the product_category table.

const productData = await readCSV(path.join(__dirname, 'csv', 'product.csv'));
await Product.bulkCreate(productData);
console.log('\n----- product SEEDED -----\n');

// const orderProductData = await readCSV(path.join(__dirname, 'csv', 'order_product.csv'));
// await OrderProduct.bulkCreate(orderProductData);
// console.log('\n----- order_product SEEDED -----\n');

// The error message indicates a foreign key constraint error when trying to insert data into the order_product table. Specifically, it says that the child row cannot be added or updated because a foreign key constraint fails (estore_db.order_product, CONSTRAINT order_product_ibfk_2 FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE).

// This suggests that there may be an issue with the product_id column in the order_product table, possibly related to the foreign key relationship with the id column in the product table.

// One possible solution is to check if the id column in the product table has been seeded with data before seeding the order_product table. Another solution could be to check the data being inserted into the order_product table to ensure that the product_id values match those in the id column of the product table.





process.exit(0);
}

seedAll();


// const obj = {
//     csvFilePath: './csv/billing_address.csv',
//     databaseName: 'estore_db', //Name must match with your local database
//     tableName: 'testTableName', //Pick a name for your table
//     columnTypes: [
//       //The number of column must match your data from csv
//       'TEXT',
//       'INTEGER',
//       'TEXT',
//       'TEXT',
//       'TEXT',
//       'TEXT',
//       'TEXT',
//       'TEXT',
//       'TEXT',
//       'TEXT',
//       'TEXT'
//     ]
//   };