const withAuth = require('../public_html/auth');
const router = require('express').Router();
const {Product, ProductCategoryGender, ProductCategory} = require('../models');
const { getArrayForDeptAndCatMegaMenu } = require('../helpers/getMegaMenuCategories');


router.get("/", withAuth,  async (req, res) => {
  //const withAuth = require(__dirname + '/public_html/auth.js');
  // res.sendFile(path.join(__dirname + '/views/home.html')) 

  // for navbar
const megaMenuArray = await getArrayForDeptAndCatMegaMenu();

  const getGenderDepartments = async () => {
    const productCategoryGenderData = await ProductCategoryGender.findAll({
      // include: [{
      //   model: ProductCategory,
      //   attributes: ['product_category_name', 'product_category_image', 'id'],
      // }],
      raw: true, // Set raw to true to get only the data
    });

    console.log(productCategoryGenderData);
    return productCategoryGenderData;
  };

  const data = await getGenderDepartments();
  // res.json( data )
  res.render("home", { data, megaMenuArray });
});

router.get("/product-categories/:id", withAuth, async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))

  // for navbar
  const megaMenuArray = await getArrayForDeptAndCatMegaMenu();

  const genderDepartmentId = req.params.id; // get the body of the req object

  const getProductCategories = async () => {
    const productCategoriesData = await ProductCategory.findAll({
      where: {
        product_category_gender_id: genderDepartmentId, // specify the condition for the 'id' column
      },
      raw: true, // Set raw to true to get only the data
    });

    // console.log(productCategoriesData);
    return productCategoriesData;
  };

  const productCategoryGenderName = await ProductCategoryGender.findAll({
    where: {
      id: genderDepartmentId, // replace 3 with the desired id value
    },
    attributes: ["product_category_gender_name"], // select only the 'name' attribute
    raw: true, // Set raw to true to get only the data
  });

  const data2 = await getProductCategories();
  console.log("hello " + JSON.stringify(data2));

  // routerend data2 with genderDepartmentId
  // data2.push(productCategoryGenderName)

  data2.push(productCategoryGenderName[0].product_category_gender_name);

  console.log(data2);
  // res.json( body.id )
  // console.log( req.body )
  // res.json( data2 )

  res.render(`product-categories`, { data2, megaMenuArray });

  // res.redirect(`/product-category/${req.body}`);
});

router.get("/product-category/:id", withAuth, async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))

  // for navbar
  const megaMenuArray = await getArrayForDeptAndCatMegaMenu();

  const productCategoryId = req.params.id;
  console.log(productCategoryId);

  const getProductCategory = async () => {
    const productCategoryData = await Product.findAll({
      where: {
        product_category_id: req.params.id, // specify the condition for the 'id' column
      },
      raw: true, // Set raw to true to get only the data
    });

    console.log(productCategoryData);
    return productCategoryData;
  };

  const data3 = await getProductCategory();

  const productCategoryName = await ProductCategory.findAll({
    where: {
      id: productCategoryId, // replace 3 with the desired id value
    },
    attributes: ["product_category_name"], // select only the 'name' attribute
    raw: true, // Set raw to true to get only the data
  });

  data3.push(productCategoryName[0].product_category_name);

  // res.json( data )
  res.render("product-category", { data3, megaMenuArray });
});
router.get("/product/:id", withAuth, async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))

  // for navbar
  const megaMenuArray = await getArrayForDeptAndCatMegaMenu();

  const productId = req.params.id;
  console.log(productId);

  const getProductCategory = async () => {
    const productData = await Product.findAll({
      where: {
        id: productId, // specify the condition for the 'id' column
      },
      raw: true, // Set raw to true to get only the data
    });

    console.log(productData);
    return productData;
  };

  const data4 = await getProductCategory();



  // res.json( data )
  res.render("product", { data4, megaMenuArray });
});
 
router.get("/cart", withAuth, async (req, res) => {
  const megaMenuArray = await getArrayForDeptAndCatMegaMenu();
  res.render("cart", {megaMenuArray});
});
router.get("/checkout" , withAuth, (req, res) => {
  res.sendFile(__dirname + "/public_html/checkout.html");
});
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  