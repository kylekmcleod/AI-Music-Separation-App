const mongoose = require('mongoose');

// Mongoose connection
const uri = "mongodb+srv://kylekmcleod:SongSeperator8725!@songseperator.vzsunrc.mongodb.net/?retryWrites=true&w=majority&appName=SongSeperator";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
connect();