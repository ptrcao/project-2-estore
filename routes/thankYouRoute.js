const express = require("express");
const { or } = require("../config/connection");
const router = express.Router();

const { BillingAddress, 
    Customer,
    OrderProduct,
    Order,
    Product,
    ShippingAddress
  } = require('../models');

  
router.get("/:order-id", async (req, res) => {

  const orderId = req.params['order-id'];

// Sequelize Query
// findAll shipping_address_id, billing_address_id, customer_id

const orderForeignKeys = await Order.findOne({
    where: { id: orderId },
    // attributes: ['firstName', 'lastName']
    raw: true
  }
  );
  console.log(orderId)
  res.json(orderForeignKeys)
  console.log(orderForeignKeys)
//   res.render("thank-you", {});
});

module.exports = router;