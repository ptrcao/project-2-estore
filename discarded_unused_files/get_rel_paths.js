// To ensure that the function returns the correct OS-specific path separator, you can use the path.sep property provided by the path module in Node.js:

// In this version of the function, the filePath variable is set using path.join(directoryPath, file) as before. However, when adding the path to the relativePaths array, the path separator is determined using the path.sep property, which returns the correct separator for the current operating system. The split() method is then used to split the path string into an array using the OS-specific separator, and the join() method is used to join the array elements back together using the forward slash as the separator.

// With this change, the getRelativePaths() function should return a correctly formatted OS-specific relative path, regardless of the operating system it is run on.

// const fs = require('fs');
// const path = require('path');

// function getRelativePaths(directoryPath, callback) {
//   // Create an empty array to store the relative file paths
//   const relativePaths = [];

//   // Read the contents of the directory
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error(`Error reading directory: ${err}`);
//       callback(err);
//       return;
//     }

//     // Loop through each file in the directory
//     files.forEach((file) => {
//       // Get the full path of the file
//       const filePath = path.join(directoryPath, file);

//       // Add the file path to the array, using the correct path separator
//       relativePaths.push(filePath.split(path.sep).join('/'));
//     });

//     // Call the callback function with the relativePaths array
//     callback(null, relativePaths);
//   });
// }

// module.exports = {
//   getRelativePaths
// };



const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);

async function getRelativePaths(directoryPath) {
  const relativePaths = [];
  
  try {
    const files = await readdir(directoryPath);
    
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      relativePaths.push(filePath.split(path.sep).join('/'));
    });
    
    return relativePaths;
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    throw err;
  }
}

module.exports = {
  getRelativePaths
};