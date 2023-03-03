const router = require('express').Router();
const productRoutes = require('./product-routes');
const orderRoutes = require('./order-routes');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
