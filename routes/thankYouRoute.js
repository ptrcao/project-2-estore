const express = require("express");
const router = express.Router();

router.get("/:order-id", (req, res) => {
  // res.sendFile(__dirname + '/public_html/checkout.html');
  res.render("thank-you", {});
});

module.exports = router;