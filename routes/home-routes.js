const router = require('express').Router();
const {Product} = require('../models');
const withAuth = require(__dirname + '/public_html/auth.js');

router.get ('/', async (req,res)=> {
try {
    const dbProductData = await Product.findAll({
        include: [
            {
                model: Product,
                attributes: ['id', 'description'],
            },
        ],
    });
const products =  dbProductData.map ((product) =>
product.get({ plain: true})
);

res.render('homepage', {
    products,
    loggedIn: req.session.loggedIn,
  });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/product/:id', withAuth, async (req, res) => {
    try {
      const dbProductData = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            attributes: [
              'id',
              'product_name',
              'price',
              'stock',
              'product_category_id',
              'product_image',
              'description',
            ],
          },
        ],
      });

      const product = dbProductData.get({ plain: true });
      res.render('product', { product, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

 
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  