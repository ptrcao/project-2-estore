const moment = require('moment-timezone');
const sequelize = require('../config/connection');
// IN PROGRESS HELPING OTHERS

const { BillingAddress, 
    Customer,
    OrderProduct,
    Order,
    Product,
    ProductCategory,
    ProductCategoryGender,
    ShippingAddress
  } = require('../models');



// productLineArray should be an array of arrays with each pair being product id and quantity [[1,5],[3,1]], corresponding to an item line in the cart
// price is not needed as it is already in the product table

// customerArray

// {
//   customerFirstName: 'rewerw',
//   customerLastName: 'fdsdsf',
//   customerEmail: 'dsffds@gfdgf.com',
//   customerPhoneNumber: '342432',
//   billingCompanyName: 'fdsfds',
//   billingAddressLine1: 'sdfdsf',
//   billingAddressLine2: 'dsfsdf',
//   billingState: 'fdsfsd',
//   billingPostalCode: '3243',
//   billingCountry: 'fhgghf',
//   shippingFirstName: 'sdffds',
//   shippingLastName: 'dfssdf',
//   shippingPhoneNumber: 'dfsdsf',
//   shippingCompanyName: 'dfssfd',
//   shippingAddressLine1: 'dfsfds',
//   shippingAddressLine2: 'fsdfsd',
//   shippingState: 'sdfdfs',
//   shippingPostalCode: '4434',
//   shippingCountry: 'rttrerte'
// }
// orderDateTime


// async/await
// Book.create({
//     title: req.body.title,
//     author: req.body.author,
//     is_paperback: true
//   })
//     .then((newBook) => {
//       // Send the newly created row as a JSON object
//       res.json(newBook);
//     })


async function insertOrder(reqBody, cartItems){

// COMPLETE SCENARIO: How to enter a new order into the database:

// Insert the customer details if they do not exist

// raw equivalient: `INSERT INTO customer (customer_first_name, customer_last_name, customer_email, customer_phone_number)`
// VALUES ('${reqBody.customerFirstName}', '${reqBody.customerLastName}', '${reqBody.customerEmail}', '${reqBody.customerPhoneNumber}');`
const insertCustomer = await Customer.create(
    {
        customer_first_name: reqBody.customerFirstName,
        customer_last_name: reqBody.customerLastName,
        customer_email: reqBody.customerEmail,
        customer_phone_number: reqBody.customerPhoneNumber,
    }, 
{ raw: true }
)
console.log('insertCustomer')

// Get the customer_id for the new customer
let [customerId] = (await sequelize.query('SELECT LAST_INSERT_ID() as id'));
// as because otherwise trying to access with dot notation becomes .LAST_INSERT_ID() which could be confused as a function
customerId = customerId[0].id
console.log('Got customerId: ' + customerId)

// Insert the billing address if it does not exist
// `INSERT INTO billing_address (company_name, address_line_1, address_line_2, state, postcode, country)
// VALUES ('${reqBody.billingCompanyName}', '${reqBody.billingAddressLine1}', '${reqBody. billingAddressLine2}', '${reqBody.billingState}', '${reqBody}', '${billingAddressArray[5]}');`
const insertBillingAddress = await BillingAddress.create({
company_name: reqBody.billingCompanyName, 
address_line_1: reqBody.billingAddressLine1, 
address_line_2: reqBody.billingAddressLine2, 
state: reqBody.billingState, 
postcode: reqBody.billingPostalCode,
country: reqBody.billingCountry
},
{ raw: true }
)

console.log('insertBillingAddress')

// Get the billing_address_id for the new address
// `SET @billing_address_id := LAST_INSERT_ID();`
let [billingAddressId] = (await sequelize.query('SELECT LAST_INSERT_ID() as id'));
billingAddressId = billingAddressId[0].id

console.log('Got billingAddressId: ' + billingAddressId)


// Insert the shipping address if it does not exist
// `INSERT INTO shipping_address (receiver_first_name, receiver_last_name, receiver_phone_number, company_name, address_line_1, address_line_2, state, postcode, country)
// VALUES ('${reqBody.shippingFirstName}', '${reqBody.shippingLastName}', '${reqBody.shippingPhoneNumber}', '${shippingCompanyName}', '${reqBody.shippingAddressLine1}', '${reqBody.shippingAddressLine2}', '${reqBody.shippingState}', '${shippingPostalCode}', '${reqBody.shippingCountry}');`
const insertShippingAddress = await ShippingAddress.create({
    receiver_first_name: reqBody.shippingFirstName,
    receiver_last_name: reqBody.shippingLastName,
    receiver_phone_number: reqBody.shippingPhoneNumber,
    company_name: reqBody.shippingCompanyName,
    address_line_1: reqBody.shippingAddressLine1,
    address_line_2: reqBody.shippingAddressLine2,
    state: reqBody.shippingState,
    postcode: reqBody.shippingPostalCode,
    country: reqBody.shippingCountry
},
{ raw: true }
)



// Get the shipping_address_id for the new address
let [shippingAddressId] = (await sequelize.query('SELECT LAST_INSERT_ID() as id'));
shippingAddressId = shippingAddressId[0].id

console.log('Got billingAddressId: ' + shippingAddressId)



function getDateTimeAEST() {
    // convert to Australian Eastern Standard Time
    return moment.utc(this.getDataValue('createdAt')).tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss');
  }


  // Get the current UTC time
const now = new Date();

// Convert to the desired timezone (in this case, Australia/Sydney)
const nowSydney = moment.utc(now).tz('Australia/Sydney');

// Format the date and time as a string in the desired format
const formattedTime = nowSydney.format('YYYY-MM-DD HH:mm:ss');
// in real world app, you would grab the time and tz from client machine
console.log('got time: ' + formattedTime)




// Insert the order details
// `INSERT INTO 'order' (customer_id, billing_address_id, shipping_address_id, order_date_time)
// VALUES (@customer_id, @billing_address_id, @shipping_address_id, '${orderDateTime}');`
await Order.create({
    customer_id: customerId,
    billing_address_id: billingAddressId,
    shipping_address_id: shippingAddressId,
    order_date_time: formattedTime
},
{ raw: true }
)

console.log('insertOrder')

// Get the order_id for the new order
// const orderId = await sequelize.query(`SET @order_id := LAST_INSERT_ID();`);
let [orderId] = (await sequelize.query('SELECT LAST_INSERT_ID() as id'));
orderId = orderId[0].id
console.log('Got orderId: ' + orderId)

// mock value
// productLineArray = [{id: 1, qty: 2},{id: 3, qty: 1},{id: 10, qty: 5}]

console.log('Got cartItems: ' + JSON.stringify(cartItems))

// Loop is not a asynchronous (cannot use await in for loop)
// hence we use promise.all
// you cannot insert per loop because the loop will not wait for the insert operations to complete before progressing
// create array first and then bulk insert/create

const insertOrderArray = [];
const ordersToBeCreated = [];
for(let i = 0; i < cartItems.length; i++){
    ordersToBeCreated.push({
        order_id: orderId,
        product_id: cartItems[i].id,
        quantity: cartItems[i].qty
    })
    
    //Insert the order-product
    // sql = `INSERT INTO order_product (order_id, product_id, quantity)
    // VALUES (@order_id, ${productLineArray[i].id}, ${productLineArray[i].qty});`
    
    // const insertOrderElement = await OrderProduct.create({
    //     order_id: orderId,
    //     product_id: cartItems[i].id,
    //     quantity: cartItems[i].qty
    // },
    // { raw: true }
    // )
    // insertOrderArray.push(insertOrderElement)
}

await OrderProduct.bulkCreate(ordersToBeCreated);
console.log('insertOrderArray');

console.log('Done');

return orderId;

}

// TEST INSERTION IN WORKBENCH:
// select * from customer as c;
// select * from billing_address as sa;
// select * from shipping_address as ba;
// select * from `order` as `o`;
// select * from `order_product` as 'op';

module.exports = {
    insertOrder
  };