const router = require('express').Router();
const { Product } = require('../../models');

router.get('/checkout', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();

    // Return the products as JSON data
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
