const { ProductCategoryGender } = require('./models');
const { ProductCategory } = require('./models');
const { Product } = require('./models');

const path = require('path');
const express = require('express');
const router = require('express').Router();
// Import the connection object
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
// const routes = require('./controllers')
const sequelize = require('./config/connection');



app.use(
  session({
    secret: process.env.COOKIE_SECRET || "secret",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30 minutes
      sameSite: "strict",
      secure: false,
    },
  })
);
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS

app.set('view engine', 'ejs');

// Check that both app.set and router.set are needed

// const { getProductCategoryGenderData } = require('./controllers/productCategoryGenderController');

// router.get('/', async (req, res) => {
//   try {
//     const categoriesByGender = await getProductCategoryGenderData();
//     res.render('home', { categoriesByGender });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// app.use(routes);


const checkoutRoutes = require('./routes/api/checkoutRoutes');

// app.use(
// '/checkout'
// )

// Expose the public_html folder to the client-side
app.use(express.static('public_html'));
// /product/:id
// /product_categories/
// pro

// const { getProductCategoryGenderData } = require('./controllers/productCategoryGenderController');

// router.get('/', async (req, res) => {
//   try {
//     const categoriesByGender = await getProductCategoryGenderData();
//     res.render('home', { categoriesByGender });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// const checkoutRoutes = require('./routes/api/checkoutRoutes');



app.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))



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

  const data = await getGenderDepartments();
  // res.json( data )
  res.render('home', { data })
});



app.get('/product-categories/:id', async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))

  const genderDepartmentId = req.params.id; // get the body of the req object


  const getProductCategories = async () =>{

      const productCategoriesData = await ProductCategory.findAll({
        where: {
          product_category_gender_id: genderDepartmentId // specify the condition for the 'id' column
        },
          raw: true, // Set raw to true to get only the data
        });
        
        // console.log(productCategoriesData);
        return productCategoriesData;
  }


  const productCategoryGenderName = await ProductCategoryGender.findAll({
    where: {
      id: genderDepartmentId // replace 3 with the desired id value
    },
    attributes: ['product_category_gender_name'], // select only the 'name' attribute
    raw: true, // Set raw to true to get only the data
  });








  const data2 = await getProductCategories();
  console.log('hello ' + JSON.stringify(data2))

  // Append data2 with genderDepartmentId
  // data2.push(productCategoryGenderName)


 data2.push(productCategoryGenderName[0].product_category_gender_name);


  console.log(data2)
  // res.json( body.id )
  // console.log( req.body )
  // res.json( data2 )
  res.render(`product-categories`, { data2 })
  
  // res.redirect(`/product-category/${req.body}`);
});




app.get('/product-category/:id', async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))

  const productCategoryId = req.params.id;
  console.log(productCategoryId);

   const getProductCategory = async () =>{

      const productCategoryData = await Product.findAll({
        where: {
          product_category_id: req.params.id // specify the condition for the 'id' column
        },
          raw: true, // Set raw to true to get only the data
        });
        
        console.log(productCategoryData);
        return productCategoryData;
  }

  const data3 = await getProductCategory();

  const productCategoryName = await ProductCategory.findAll({
    where: {
      id: productCategoryId // replace 3 with the desired id value
    },
    attributes: ['product_category_name'], // select only the 'name' attribute
    raw: true, // Set raw to true to get only the data
  });

  data3.push(productCategoryName[0].product_category_name);

  // res.json( data )
  res.render('product-category', { data3 })
});




app.get('/product/:id', async (req, res) => {
  // res.sendFile(path.join(__dirname + '/views/home.html'))

  const productId = req.params.id;
  console.log(productId);

   const getProductCategory = async () =>{

      const productData = await Product.findAll({
        where: {
          id: productId // specify the condition for the 'id' column
        },
          raw: true, // Set raw to true to get only the data
        });
        
        console.log(productData);
        return productData;
  }

  const data4 = await getProductCategory();

  const productName = await Product.findAll({
    where: {
      id: productId // replace 3 with the desired id value
    },
    attributes: ['product_name'], // select only the 'name' attribute
    raw: true, // Set raw to true to get only the data
  });

  data4.push(productName[0].product_name);

  // res.json( data )
  res.render('product', { data4 })
});






app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public_html/cart.html');
});





// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
