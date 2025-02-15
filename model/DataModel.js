const mongoose = require('mongoose');

// Define the schema for the bacteria data
const bacteriaSchema = new mongoose.Schema({
  bacteriaName: { type: String, required: true }, // Name of the bacteria
  penicillin: { type: String, required: true },   // Response to Penicillin
  streptomycin: { type: String, required: true },  // Response to Streptomycin
  neomycin: { type: String, required: true },      // Response to Neomycin
  gram: { type: String, required: true },          // Gram classification (e.g., Gram-positive, Gram-negative)
});

// Create and export the model from the schema
module.exports = mongoose.model('data', bacteriaSchema);
