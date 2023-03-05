const express = require('express');

// Import the connection object
const sequelize = require('./config/connection');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
