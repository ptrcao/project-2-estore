const withAuth = require("../public_html/auth");
const router = require("express").Router();
const {
  Product,
  ProductCategoryGender,
  ProductCategory,
  Customer,
  Order,
  OrderProduct,
  ShippingAddress,
  BillingAddress,
} = require("../models");
const {
  getArrayForDeptAndCatMegaMenu,
} = require("../helpers/getMegaMenuCategories");
const thankYouRoutes = require("./thankYouRoute");

router.use("/thank-you", withAuth, thankYouRoutes);

router.get("/", async (req, res) => {

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
  const loggedIn = req.session.loggedIn;
  
  res.render("home", { data, loggedIn, megaMenuArray  });
});

router.get("/product-categories/:id", async (req, res) => {
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
  const loggedIn = req.session.loggedIn;
  res.render(`product-categories`, { data2, loggedIn, megaMenuArray });

  // res.redirect(`/product-category/${req.body}`);
});

router.get("/product-category/:id", async (req, res) => {
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
  const loggedIn = req.session.loggedIn;
  res.render("product-category", { data3, loggedIn, megaMenuArray });
});
router.get("/product/:id", async (req, res) => {
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
  const loggedIn = req.session.loggedIn;
  res.render("product", { data4, loggedIn, megaMenuArray });
});

router.get("/cart", async (req, res) => {
  const megaMenuArray = await getArrayForDeptAndCatMegaMenu();
  const loggedIn = req.session.loggedIn;
  res.render("cart", { megaMenuArray, loggedIn });
});
router.get("/checkout", withAuth, async (req, res) => {
  const megaMenuArray = await getArrayForDeptAndCatMegaMenu();

  const customerData = await Customer.findByPk(req.session.user_id, {
    attributes: ["customer_first_name", "customer_last_name", "customer_email", "customer_phone_number"]
  })
  console.log(customerData.get({plain: true}))
  const loggedIn = req.session.loggedIn;
 res.render('checkout', {megaMenuArray, loggedIn, customerData});
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  
  res.render("login");
});
router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("register");
});

module.exports = router;
