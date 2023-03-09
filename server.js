const { ProductCategoryGender } = require("./models");
const { ProductCategory } = require("./models");
const { Product } = require("./models");

const path = require("path");
const express = require("express");
const router = require("express").Router();
// Import the connection object
const session = require("express-session");
const routes = require('./routes');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const routes = require('./controllers')
const {insertOrder} = require('./controllers/queries')

const sequelize = require("./config/connection");

const app = express();

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
app.use("/api/cart", require("./routes/api/cartRoutes"));
app.set("view engine", "ejs");

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



// Expose the public_html folder to the client-side
app.use(express.static("public_html"));
app.use(routes);
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

// needed to serve font awesome
const serveStatic = require("serve-static");

app.use("/static", serveStatic(__dirname + "/node_modules"));

async function getArrayForDeptAndCatMegaMenu() {
  const productCategories = await ProductCategoryGender.findAll({
    include: [
      {
        model: ProductCategory,
        as: "product_categories",
      },
    ],
  });

  return productCategories;
}




// CHECKOUT BUTTON --> INSERT NEW ORDER, CUSTOMER DETAILS, SHIPPING DETAILS, PRODUCT DETAILS, REDIRECTS TO THANK YOU PAGE
app.post("/checkout", async (req, res) => {
try{   
  const cart = req.session?.cart;
  if (!cart) {
    res.status(400).json({ error: "No cart" });
    return;
  }
  // All items in the cart and their quantities
  const cartItems = req.session.cart.items.map((item) => {
    return { id: item.id, qty: item.amount };
  });
  const body = req.body;
  console.log(body);
  const orderId = await insertOrder(body, cartItems, req.session.user_id);

  //res.redirect("/thank-you/:order-id");
  res.json({
    'orderId': orderId
  }) 
}
catch(err){ 
  console.error(err)
  res.status(500).send(err); 
}

  
  
});




// app.get("/thankyou/:id", async (req, res) => {

//   const orderId = req.params['order-id'];

// // Sequelize Query
// // findAll shipping_address_id, billing_address_id, customer_id

// const orderForeignKeys = await Order.findOne({
//     where: { id: orderId },
//     // attributes: ['firstName', 'lastName']
//     raw: true
//   }
//   );
//   console.log(orderId)
// //   res.json(orderForeignKeys)
//   console.log(orderForeignKeys)
// //   res.render("thank-you", {});
// res.send("Hello")
// // res.sendFile('../views/thank-you.ejs')
// });

// app.get('/p/:id',function(req,res){
//   res.send('Id is ' + req.params.id)
// })

// Connect to the database before starting the Express.js server
sequelize.sync({force : false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});


// let megaMenuArray; 

// async function getMegaMenuData() {
//   megaMenuArray = await getArrayForDeptAndCatMegaMenu();
// }

// getMegaMenuData();


// module.exports = { megaMenuArray };