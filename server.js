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


// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});


