const router = require('express').Router();
const Cart = require('../../helpers/cart');
const {Product} = require('../../models');


const withCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = new Cart();
    }
    next();
}

router.get("/", withCart, (req, res) => { 
    res.json(req.session.cart);
  });


router.post("/add", withCart, (req, res) => {
    const cart = req.session.cart ? new Cart(req.session.cart) : new Cart();
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


router.delete("/remove", withCart, (req, res) => {
    const cart = req.session.cart ? new Cart(req.session.cart) : new Cart();
    cart.removeItem(req.body.id);
    req.session.cart = cart;
    res.json(cart);
});

module.exports = router;
