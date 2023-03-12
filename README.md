# Project 2 e-Store

![Home Page](/readme-assets/images/readme-ss-localhost_3001_.png)

## Table of Contents
- [Description](#description)
    - [Features](#features)
    - [Product Categories](#product-categories)
    - [Gender Departments](#gender-departments)
    - [Adding Products to Cart](#adding-products-to-cart)
    - [Checkout](#checkout)
    - [Thank You Page](#thank-you-page)
- [Installation](#installation)
- [Technology](#technology)
- [Credits](#credits)
- [License](#license)

## Description

This is an e-commerce website designed for retail clients to sell their clothing. The website provides customers with the ability to browse clothing by product category and gender department.

### Features
* Browse clothing by product category and gender department
* Add products to cart
* Save product selection in session storage
* Checkout with sign-up form (first time) and order form
* Summary of purchase on a thank you page

### Product Categories
Customers can browse clothing by product category, including:

* Skirts
* Beanies
* Hosiery
* Suits
* Mens Accessories
* Womens Accessories
* Kids Casual
* Kids Formal
* Summer Dresses
* Jeans
* Womens Shoes
* Mens Shoes
* Womens Tops
* Mens Tops

![Product Category: Suits](/readme-assets/images/readme-ss-localhost_3001_product-category_4.png)

![Product](/readme-assets/images/readme-ss-localhost_3001_product_31.png)

### Gender Departments
Customers can also browse clothing by gender department, including:

* Mens
* Womens
* Kids
* Unisex

### Adding Products to Cart
When a customer finds a product they want to purchase, they can click the "Add to Cart" button. This will save the product selection in session storage and persist until the customer removes it from the cart.

![Cart Page](/readme-assets/images/localhost_3001_cart.png)

### Sign up and login/logout
Before the user is able to checkout their cart, they must have a customer account.  The opportunity is presented to do so, or log in to an existing account, in the leadup to checkout.

![Login required](/readme-assets/images/localhost_3001_login.png)

### Checkout
When the customer is ready to checkout, they can click on the cart icon and select "Checkout". If it's their first time checking out, they will be presented with a sign-up form where they can create an account. After signing up, they will then be presented with an order form where they can enter their shipping and payment information.

![Checkout Page](/readme-assets/images/localhost_3001_checkout.png)

### Thank You Page
After completing the order form, the customer will be presented with a "thank you" page that summarizes their purchase. This page will include the product(s) purchased, the total cost, and shipping information.

![Thank you Page](/readme-assets/images/localhost_3001_thank-you_11.png)



## Installation

1. Install all required npm packages:
```
npm i
```

2. Fill out the database and port parameters in .env.example - use your own parameters:
```
DB_NAME=
DB_PASSWORD=
DB_USER=
# The default port for MySQL is 3306, so you should use that unless you have explicitly configured your MySQL server to use a different port.
PORT=
```

3. Rename .env.example to .env

4. cd to db/ 

5. Log into mysql in terminal:
```
mysql -u root -p
```

6. Create database (automatically drops first if already exists):
```
source schema.sql
```
7. cd back to the project root

8. Start server:
```
node server.js
```
or, if you are using a start script defined in your package.json, for example, in the case of using nodemon:
```
npm run start
```

9. Seed the database:
```
npm run seed
```

10. Use Workbench to test out queries and study the database structure and contents.

11. To reset/restore the database to its original state, just shut down your server and repeat from Step 1.

<!-- 
## Usage
To use this application:
The user must login to the page, by either signing up or logining in for the products to appear.
The user must then navigate the store looking at different article of clothings, once a desired product is found, click on one of the products, as shown below.
![Suits](/readme-ss-localhost_3001_product-category_4.png)

After clicking on a product, the below page should appear. 

![Product](/readme-ss-localhost_3001_product_31.png)

The user must then click add to cart, if he or she wishes to purchase the product.
Once all items have been added to cart, click on the cart icon at the top right to checkout, users must then fill in their details.
Click place order and wait for the product to arrive! -->

## Technology

* HTML, CSS
* Javascript
* MYSQL, Sequelize
* Controllers, MVC
* Express session, bycrypt

## Credits

Elisa Do - github: ED0920, elisa.do@outlook.com

Peter Cao - github: ptrcao

Dylan Pham - github: dyalnpahm, dyalnpahm@gmail.com

Sam Sweeney - github: samsween, samsweeneyy@gmail.com

Jason Yoo - github: jasonyoo3026, jasonyoo3026@gmail.com

## License

The project licence type is unspecified.