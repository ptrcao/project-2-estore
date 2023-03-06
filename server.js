const express = require('express');
<<<<<<< HEAD
const router = require('express').Router();
=======
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const session = require('express-session');
const routes = require('./controllers')
>>>>>>> a9cbaaa98e5439308767ebce940d61251d3c0ee4
// Import the connection object
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
      secure: true,
    },
  })
);

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD

// Set the view engine to EJS
router.set('view engine', 'ejs');

const { getProductCategoryGenderData } = require('./controllers/productCategoryGenderController');

router.get('/', async (req, res) => {
  try {
    const categoriesByGender = await getProductCategoryGenderData();
    res.render('home', { categoriesByGender });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
=======
app.use(routes);
>>>>>>> a9cbaaa98e5439308767ebce940d61251d3c0ee4

const checkoutRoutes = require('./routes/api/checkoutRoutes');

// app.use(
// '/checkout'
// )

// Expose the public_html folder to the client-side
app.use(express.static('public_html'));



app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public_html/cart.html');
});




// fetch('/api/checkout', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log(data);
//   // redirect to order confirmation page
// })
// .catch(error => {
//   console.error('There was an error submitting the form:', error);
// });



// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
