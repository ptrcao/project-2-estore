const express = require('express');

// Import the connection object
const sequelize = require('./config/connection');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
