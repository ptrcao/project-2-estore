const router = require('express').Router();
const cartRoutes = require('./cart');


router.use('/cart', cartRoutes);


module.exports = router;

