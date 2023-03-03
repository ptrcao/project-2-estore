// Define a new function in your helper module that takes two arguments: the model to bulk create the data for, and the array of data to create.

// This function takes three arguments: model, data, and callback. The model argument is the Sequelize model to bulk create the data for, data is the array of data to create, and callback is the function to call when the operation is complete.

// In the function body, the model.bulkCreate() method is called with the data array. If the operation succeeds, the success message is logged and the callback function is called with a null error argument. If the operation fails, the error message is logged and the callback function is called with the error object.

function bulkCreate(model, data) {
    model.bulkCreate(data)
      .then(() => {
        console.log('Data imported successfully');
        // callback(null);
      })
      .catch((err) => {
        console.error(`Error importing data: ${err}`);
        // callback(err);
      });
  }
  
  module.exports = 
    bulkCreate
  ;