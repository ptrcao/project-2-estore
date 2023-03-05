
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
  