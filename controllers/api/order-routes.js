const router = require('express').Router();
const express = require('express');
const { Product } = require('../../models');

router.get('/api/orders', (req, res) => {
    // TODO: Implement logic to fetch all orders
    Product.FindAll().then((productData) => {
        res.json(productData);
        })
    });

    // Route for handling POST requests to create a new order
router.post('/api/orders', (req, res) => {
    // TODO: Implement logic to create a new order
    Product.create(req.body)
    .then((newProduct) => {
      res.json(newProduct);
    })
    .catch((err) => {
      res.json(err);
    });
    });

// Route for handling PUT requests to update an existing order by ID
router.put('/api/orders/:id', (req, res) => {
    // TODO: Implement logic to update an existing order by ID
    Product.update(
        {
            // All the fields you can update and the data attached to the request body.
            id: req.body.id,
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            category_id: req.body.category_id,
        },
        {
        // Gets a product based on the id given in the request parameters
        where: {
            id: req.params.id,
        },
        }
        )
        .then((updatedProduct) => {
            res.json(updatedProduct);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });

    });
      
  
  // Route for handling DELETE requests to delete an order by ID
router.delete('/api/orders/:id', (req, res) => {
    // TODO: Implement logic to delete an order by ID
    Product.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((deletedProduct) => {
          res.json(deletedProduct);
        })
        .catch((err) => res.json(err));

    });
  
module.exports = router;

