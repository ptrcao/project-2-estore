// This code defines a new readCSV() function that takes a file path and a callback function as arguments. The fs.createReadStream() method is used to create a read stream for the CSV file, which is then piped through the csv-parser module to parse the file data into JavaScript objects. The parsed objects are added to the results array in the 'data' event handler, and the callback function is called with the results array in the 'end' event handler. If an error occurs, the callback function is called with the error object in the 'error' event handler.

// const fs = require('fs');
// const csv = require('npm');

// function readCSV(filePath, callback) {
//   const results = [];

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (data) => {
//       results.push(data);
//     })
//     .on('end', () => {
//       callback(null, results);
//     })
//     .on('error', (error) => {
//       callback(error);
//     });
// }

// module.exports = {
//   readCSV
// };


// const fs = require('fs');
// const csv = require('csv-parser');
// const util = require('util');

// const createReadStream = util.promisify(fs.createReadStream);

// async function readCSV(filePath) {
//   const results = [];

//   await createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (data) => {
//       results.push(data);
//     })
//     .on('error', (error) => {
//       throw error;
//     });

//   return results;
// }

// module.exports = {
//   readCSV
// };


const fs = require('fs');
const csvParser = require('csv-parser');

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = {
  readCSV
};