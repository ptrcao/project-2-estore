const router = require('express').Router();
const Cart = require('../../helpers/cart');
const {Product} = require('../../models');

// Check if customer has a cart in session and create one if not
const withCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = new Cart();
    }
    next();
}
// Get cart
router.get("/", withCart, (req, res) => { 
    res.json(req.session.cart);
  });

// Add item to cart and update session
router.post("/", withCart, (req, res) => {
    const cart = req.session.cart ? new Cart(req.session.cart) : new Cart();
    console.log(req.body)
    Product.findByPk(req.body?.id)
    .then(product => {
        cart.addItem(product.get({plain: true}), 1);
        req.session.cart = cart;
        res.json(cart);
    })
    .catch(err => {
        console.log(err);
    })
});

// Remove item from cart and update session
router.delete("/", withCart, (req, res) => {
    const cart = req.session.cart ? new Cart(req.session.cart) : new Cart();
    cart.removeItem(req.body.id);
    req.session.cart = cart;
    res.json(cart);
});

module.exports = router;
