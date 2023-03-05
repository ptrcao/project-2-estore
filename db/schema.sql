<<<<<<< HEAD
DROP DATABASE IF EXISTS product_db;
CREATE DATABASE product_db;
=======
DROP DATABASE IF EXISTS estore_db;
CREATE DATABASE estore_db;

-- CREATE TABLE product (
--   product_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   product_name VARCHAR(255) NOT NULL,
--   price DECIMAL(10,2) NOT NULL,
--   stock INT NOT NULL DEFAULT 0,
--   product_category_id INT,
--   CONSTRAINT fk_product_category FOREIGN KEY (product_category_id) REFERENCES product_category (product_category_id)
-- );

-- CREATE TABLE `product_category` (
--   `product_category_id` INT NOT NULL AUTO_INCREMENT,
--   `product_category_name` VARCHAR(255) NOT NULL DEFAULT 'Uncategorized',
--   PRIMARY KEY (`product_category_id`)
-- );

USE estore_db;

>>>>>>> 94d00078959aeb56412fba15702e503ede884e3c
