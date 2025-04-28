const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Hostellers',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Force quit server if Mongo fails
  }
};

module.exports = connectDB;
