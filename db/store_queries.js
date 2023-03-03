// Do seeding script

// SELECT all products from a category by name (case sensitive)
// `SELECT * from product
// WHERE product_category_id = (SELECT id FROM product_category WHERE product_category_name = ${categoryName});`

// INSERT billing address, INSERT shipping address
// INSERT customer data
// INSERT order detail

// must insert in logical order to avoid errors
