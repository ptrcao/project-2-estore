const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Set the view engine to EJS
router.set('view engine', 'ejs');

const { getProductCategoryGenderData } = require('../controllers/productCategoryGenderController');

router.get('/', async (req, res) => {
    try {
      const categoriesByGender = await getProductCategoryGenderData();
      res.render('home', { categoriesByGender });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;