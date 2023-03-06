const { ProductCategoryGender } = require('../models');

const getGenderDepartments = async () =>{
    const productCategoryGenderData = await ProductCategoryGender.findAll({
        // include: [{
        //   model: ProductCategory,
        //   attributes: ['product_category_name', 'product_category_image', 'id'],
        // }],
        raw: true, // Set raw to true to get only the data
      });
      
      console.log(productCategoryGenderData);
      return productCategoryGenderData;
}

// getProductCategoryGenderData();










// const express = require('express')

// const router = express.Router()


// The `/api/product-category-gender` endpoint
// router.get('/', async (req, res) => {
//   try {
//     const genderDepartments = await getProductCategoryGenderData();

//     // const galleries = dbGalleryData.map((gallery) =>
//     //   gallery.get({ plain: true })
//     // );
//     res.render('home', {
//       genderDepartments,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });



const getProductCategoryGenderData = async (req, res) => {
  try {
    const categoriesByGender = await getGenderDepartments();

    // render the home view with categoriesByGender data
    res.render('home', { categoriesByGender });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProductCategoryGenderData };