const express = require("express");
// const { or } = require("../config/connection");
const router = express.Router();

const { BillingAddress, 
    Customer,
    OrderProduct,
    Order,
    Product,
    ShippingAddress
  } = require('../models');

// const megaMenuArray = require('../server')

const { getArrayForDeptAndCatMegaMenu }  = require('../helpers/getMegaMenuCategories');




// do not use "/:orderid" use '/:id' - its a fixed keyword, not up to you
router.get("/:id", async (req, res) => {

  const orderId = req.params.id;

//   console.log('session stuff' + req.session.cart);


// Sequelize Query
// Given the order id (known)

// get the shipping_address_id, billing_address_id, customer_id
const orderForeignKeys = await Order.findOne({
    where: { id: orderId },
    // attributes: ['firstName', 'lastName']
    raw: true
  }
  );



  // Get the order_product data
  const orderProductData = await OrderProduct.findAll({
    where: {
      order_id: orderId
    },
  });


//   [{"order_id":2,"product_id":3,"quantity":"1"},{"order_id":2,"product_id":4,"quantity":"3"}]
//   orderProductData.map(element => {element.product_id : element.quantity})




const productQtyPairs = orderProductData.map(element => {
    const key = element.product_id.toString();
    const value = parseInt(element.quantity);
    return { [key]: value };
  });


  function getValueByKey(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key]) {
        return arr[i][key];
      }
    }
    return null; // key not found
  }


//   const allOrderDetails = await OrderProduct.findAll({
//     include: [
//       {
//         model: Order,
//         include: [
//           {
//             model: Customer
//           },
//           {
//             model: ShippingAddress
//           },
//           {
//             model: BillingAddress
//           }
//         ],
//         where: {
//           id: orderId
//         }
//       },
//       {
//         model: Product
//       }
//     ]
//   });

 
  // Gives: [{"order_id":1,"product_id":2,"quantity":"3"},{"order_id":1,"product_id":3,"quantity":"2"},{"order_id":1,"product_id":9,"quantity":"2"}]


//   function getQuantityForProductId(productId) {
//     for (let i = 0; i < orderData.length; i++) {
//       if (orderData[i].product_id === productId) {
//         return orderData[i].quantity;
//       }
//     }
//     return null; // product not found
//   }
  
//   const quantityForProductId6 = getQuantityForProductId(6);
//   console.log(quantityForProductId6); // output: 3




  // Get the product ids
  const productIds = await OrderProduct.findAll({
    where: {
      order_id: orderId
    },
    attributes: ['product_id']
  });
  // GIVES: [{"product_id":2},{"product_id":3},{"product_id":9}]


let productIdsGetValuesArray = productIds.map( elements => elements.product_id )
// GIVES: [2,3,9]

const productData = await Product.findAll({
    where: {
      id: productIdsGetValuesArray
    },
    raw: true
  });

  console.log("----------------------------------------------------")
  console.log(productIdsGetValuesArray)
  console.log("----------------------------------------------------")

  // GIVES:
  // [{"id":2,"product_name":"Casual Cotton Skirt","price":"40","stock":75,"product_image":"/images/prod_images/casual-cotton-skirt.png","description":"Our Katies Cotton Blend Casual Skirts are perfect for any occasion, with a comfortable and stylish design that you'll love.","product_category_id":1},{"id":3,"product_name":"Ruched Pocket Skirt","price":"30","stock":50,"product_image":"/images/prod_images/ruched-pocket-skirt.png","description":"Flaunt your curves in our EMERY ROSE Ruched Wideband Waist Hidden Pocket Skirt, featuring a flattering and functional design.","product_category_id":1},{"id":9,"product_name":"Thigh High Stockings","price":"9","stock":100,"product_image":"/images/prod_images/thigh-high-stockings.png","description":"Feel sexy and confident with our Thigh High Stockings, featuring a flattering and comfortable design.","product_category_id":3}]

  
  const shippingData = await ShippingAddress.findAll({
    where: {
      id: orderForeignKeys.shipping_address_id
    },
    raw: true
  });

  const billingData = await BillingAddress.findAll({
    where: {
      id: orderForeignKeys.billing_address_id
    },
    raw: true
  });

  const customerData = await Customer.findAll({
    where: {
      id: orderForeignKeys.customer_id
    },
    raw: true
  });


//   console.log('ship: ' + JSON.stringify(shippingData))
//   console.log('bill: ' + JSON.stringify(billingData))
//   console.log('badabam: ' + JSON.stringify(customerData))

  console.log('productData' + productData)
//   res.json(orderForeignKeys)
//   console.log(orderForeignKeys)
//   res.render("thank-you", {});

console.log('yo yo')
console.log([orderProductData, productData, shippingData, billingData, customerData].map((element) => {
    return JSON.stringify(element) + '<br>';
  }).join(''));

  var megaMenuArray = await getArrayForDeptAndCatMegaMenu()


     res.render('thank-you.ejs', { megaMenuArray, productQtyPairs, getValueByKey, orderId, orderProductData, productData, shippingData, billingData, customerData })
});




module.exports = router;