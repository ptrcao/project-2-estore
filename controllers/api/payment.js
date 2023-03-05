const router = require('express').Router();
const { Cart, Product } = require('../../models');

router.get('/payment', async (req, res) => {
  try {
    const userId = req.session.userId; // Get the ID of the current user from the session

    // Fetch the user's cart from the database
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product }],
    });

    // Ensure that all products in the cart are still available and have not been modified
    for (const item of cart.products) {
      const product = item.product;
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Product ${product.id} is out of stock` });
      }
    }

    // TODO: Create an order object and save it to the database

    // Redirect the user to the payment page with the order ID
    res.redirect(`https://payment-processor.com/pay?orderId=${order.id}`);
    // URL should be updated accordingly
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
