// const seedProductCategories = require('./category-seeds');
// const seedProducts = require('./product-seeds');
// const seedCustomers = require('./tag-seeds');
// const seedBillingAddresses = require('./tag-seeds');
// const seedShippingAddresses = require('./tag-seeds');

// const sequelize = require('../config/connection');

sequelize.sync({ force: true });

// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n----- DATABASE SYNCED -----\n');
//   await seedCategories();
//   console.log('\n----- CATEGORIES SEEDED -----\n');

//   await seedProducts();
//   console.log('\n----- PRODUCTS SEEDED -----\n');

//   await seedTags();
//   console.log('\n----- TAGS SEEDED -----\n');

//   await seedProductTags();
//   console.log('\n----- PRODUCT TAGS SEEDED -----\n');

//   process.exit(0);
// };

// seedAll();





// const getRelPaths = require('../helpers/get_rel_paths');

// const csvPaths = getRelPaths.relativePaths
// console.log(csvPaths)


// Call the helper function getRelativePaths to get the rel paths of all the seed CSVs

// const { getRelativePaths } = require('../helpers/get_rel_paths');

// const directoryPath = './csv';

// const csvRelPaths = getRelativePaths(directoryPath, (err, relativePaths) => {
//   if (err) {
//     console.error(`Error getting relative paths: ${err}`);
//     return;
//   }

//   console.log(relativePaths);
//   return relativePaths;
// });


// const { getRelativePaths } = require('../helpers/get_rel_paths');

// const directoryPath = './csv';

// const csvRelPaths = (async () => {
//   try {
//     const csvPaths = await getRelativePaths(directoryPath);
//     console.log(csvPaths);
//     return csvPaths;
//   } catch (err) {
//     console.error(`Error getting relative paths: ${err}`);
//   }
// })();

// Parse CSV
// Do it for each of the CSV rel paths above

// const { readCSV } = require('../helpers/read_csv');

// const filePath = './data.csv';

// csvRelPaths.array.forEach(element => {
  
//   readCSV(element, (err, results) => {
//     if (err) {
//       console.error(`Error reading CSV file: ${err}`);
//       return;
//     }
  
//     console.log(results);
//     return results;
//   });

// });



// const csvRelPaths = await getRelativePaths(directoryPath);
// csvRelPaths.forEach(async (element) => {
//   try {
//     const results = await readCSV(element);
//     console.log(results);
//     return results;
//   } catch (err) {
//     console.error(`Error reading CSV file: ${err}`);
//   }
// });


// const fs = require('fs');
// const csv = require('csv-parser');

// const results = [];

// fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     results.push(data);
//   })
//   .on('end', () => {
//     console.log(results);
//   });



// Import the connection object
const sequelize = require('../config/connection'); 

const models = require('../models/index')
// console.log(models)

const { getRelativePaths } = require('../helpers/get_rel_paths');
const { readCSV } = require('../helpers/read_csv');
const { bulkCreate } = require('../helpers/bulk_insert')

const directoryPath = './csv';

async function seedTables() {
  try {
    const csvRelPaths = await getRelativePaths(directoryPath);
    // console.log(csvRelPaths);

    for (const csvPath of csvRelPaths) {
      const results = await readCSV(csvPath);


const model = csvPath.replace(".csv","").replace("csv/","")

// models.model.bulkCreate(results)

// const models = sequelize.import( model )

// console.log(query)
// sequelize.query(query)
// console.log(results);
sequelize.models[model.toLowerCase()].bulkCreate(results)
// results.forEach(element => {
//   const query = `INSERT into ${model} VALUES (${element})`;
//   sequelize.query(query)
// })

// console.log(model)

// models[
// model
// ].bulkCreate(results)


// bulkCreate(model,results)

// console.log(csvPath)
// console.log(model)
    }

    // const filenames = files.map((file) => {
    //   const parsed = path.parse(file);
    //   return parsed.name;
    // });
    
    // console.log(filenames);

    

  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

seedTables();