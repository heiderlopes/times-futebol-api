// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var TimeSchema   = new mongoose.Schema({
  nome: String,
  pais: String
});

// Export the Mongoose model
module.exports = mongoose.model('Time', TimeSchema);
