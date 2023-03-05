const express = require('express');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const session = require('express-session');
const routes = require('./controllers')
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
app.use(routes);

app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public_html/cart.html');
});

app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/public_html/checkout.html');
});


// Define a route for product pages
app.get('/product/:id', function(req, res) {
  // Get the product ID from the request parameters
  const productId = req.params.id;

  // Query the database for the product data based on the ID
  // and render the product page with the data
  db.getProductById(productId, function(err, product) {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving product data.');
    } else {
      res.render('product', { product: product });
    }
  });
});

// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
