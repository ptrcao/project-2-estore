const { ProductCategoryGender } = require("../models");
const { ProductCategory } = require("../models");

async function getArrayForDeptAndCatMegaMenu() {
  const productCategories = await ProductCategoryGender.findAll({
    include: [
      {
        model: ProductCategory,
        as: "product_categories",
      },
    ],
  });
  // do something with productCategories here
  return productCategories;
}

module.exports = {
  getArrayForDeptAndCatMegaMenu,
};
