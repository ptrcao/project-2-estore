const router = require('express').Router();
const Cart = require('../../helpers/cart');
const {Product} = require('../../models');

router.get("/", (req, res) => {
    if (!req.session.cart) {
        req.session.cart = new Cart();
    }
    const cart = new Cart(req.session.cart)
    res.json(cart);
  });


router.post("/add", (req, res) => {
    const cart = req.session.cart ? new Cart(req.session.cart) : new Cart();
    Product.findByPk(req.body?.id)
    .then(product => {
        cart.addItem(product, 1);
        req.session.cart = cart;
        res.json(cart);
    })
    .catch(err => {
        console.log(err);
    })
});


router.delete("/remove", (req, res) => {
    const cart = req.session.cart ? new Cart(req.session.cart) : new Cart();
    cart.removeItem(req.body.id);
    req.session.cart = cart;
    res.json(cart);
});

module.exports = router;
