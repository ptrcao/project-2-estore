# Project 2 e-Store

## Description
This is an E-commerce clothing apparel store that allows consumers to purchase and sell physical goods, over the internet rather than at a brick-and-mortar location.
The motivation for the development of this application is a result of the dramatically fluctuating rates in the rental market for brick and mortar stores as well as a the limited reach a physical store has. With an online application the business opens its transactions and markets to more domestic and international consumers allowing for more profitability and efficiency for its business productivity. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Credits](#credits)
- [License](#license)

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

## Usage
To use this application:
The user must login to the page, by either signing up or logining in for the products to appear.
The user must then navigate the store looking at different article of clothings, once a desired product is found, click on one of the products, as shown below.
![Suits](/readme-ss-localhost_3001_product-category_4.png)

After clicking on a product, the below page should appear. 

![Product](/readme-ss-localhost_3001_product_31.png)

The user must then click add to cart, if he or she wishes to purchase the product.
Once all items have been added to cart, click on the cart icon at the top right to checkout, users must then fill in their details.
Click place order and wait for the product to arrive!

## Technology

* HTML, CSS
* Javascript
* MYSQL, Sequelize
* Controllers, MVC
* Express session, bycrypt

## Credits

Elisa Do - github: ED0920, elisa.do@outlook.com

Peter Cao - github: ptrcao, ptrcao@gmail.com

Dylan Pham - github: dyalnpahm, dyalnpahm@gmail.com

Sam Sweeney - github: samsween, samsweeneyy@gmail.com

Jason Yoo - github: jasonyoo3026, jasonyoo3026@gmail.com

## License

This project is under the licence MIT



