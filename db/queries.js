
// IN PROGRESS HELPING OTHERS

// productLineArray should be an array of arrays with each pair being product id and quantity [[1,5],[3,1]], corresponding to an item line in the cart
// price is not needed as it is already in the product table

// customerArray

function insertOrder(productLineArray, customerArray, billingAddressArray, shippingAddressArray, orderDateTime){

// COMPLETE SCENARIO: How to enter a new order into the database:

// Insert the customer details if they do not exist
`INSERT INTO customer (customer_first_name, customer_last_name, company_name, customer_email, customer_phone_number)
VALUES ('${customerArray[0]}', '${customerArray[1]}', '${customerArray[2]}', '${customerArray[3]}', '${customerArray[4]}');`

`// Get the customer_id for the new customer
SET @customer_id := LAST_INSERT_ID();`

// Insert the billing address if it does not exist
`INSERT INTO billing_address (company_name, address_line_1, address_line_2, state, postcode, country)
VALUES ('${billingAddressArray[0]}', '${billingAddressArray[1]}', '${billingAddressArray[2]}', '${billingAddressArray[3]}', '${billingAddressArray[4]}', '${billingAddressArray[5]}');`

// Get the billing_address_id for the new address
`SET @billing_address_id := LAST_INSERT_ID();`

// Insert the shipping address if it does not exist
`INSERT INTO shipping_address (receiver_first_name, receiver_last_name, receiver_phone_number, company_name, address_line_1, address_line_2, state, postcode, country)
VALUES ('${shippingAddressArray[0]}', '${shippingAddressArray[1]}', '${shippingAddressArray[2]}', '${shippingAddressArray[3]}', '${shippingAddressArray[4]}', '${shippingAddressArray[5]}', '${shippingAddressArray[6]}', '${shippingAddressArray[7]}', '${shippingAddressArray[8]}');`

// Get the shipping_address_id for the new address
`SET @shipping_address_id := LAST_INSERT_ID();`

// Insert the order details
`INSERT INTO 'order' (customer_id, billing_address_id, shipping_address_id, order_date_time)
VALUES (@customer_id, @billing_address_id, @shipping_address_id, '${orderDateTime}');`

// Get the order_id for the new order
`SET @order_id := LAST_INSERT_ID();`

for(let i = 0; i < $productLineArray.length; i++){
    
    //Insert the order-product
    sql = `INSERT INTO order_product (order_id, product_id, quantity)
    VALUES (@order_id, ${productLineArray[i][0]}, ${productLineArray[i][1]});`
}

}
