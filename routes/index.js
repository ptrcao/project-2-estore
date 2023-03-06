const router = require('express').Router();

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