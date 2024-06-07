const mongoose = require('mongoose');
require('dotenv').config();

// Mongoose connection
const uri = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
connect();