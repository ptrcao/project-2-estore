const ProductCategory = require('../models/Product_Category');

router.get('/', async (req, res) => {
    try {
      // Get all product categories from the database
      const categories = await ProductCategory.findAll({
        attributes: [
          'sex',
          [sequelize.fn('COUNT', sequelize.col('id')), 'category_count']
        ],
        group: 'sex'
      })
  
      // Render your home page and pass the product categories as a local variable
      res.render('home', { categories });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });