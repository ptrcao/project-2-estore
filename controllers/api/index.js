const router = require('express').Router();
<<<<<<< HEAD
const productRoutes = require('./product-routes');
const orderRoutes = require('./order-routes');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
=======
const cartRoutes = require('./cart');


router.use('/cart', cartRoutes);


module.exports = router;

>>>>>>> 94d00078959aeb56412fba15702e503ede884e3c
