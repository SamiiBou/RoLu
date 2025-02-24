// backend/src/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobdb';
if (!MONGODB_URI) {
  console.error("MONGODB_URI not defined in environment");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
};

// Event listeners for better debugging
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to ' + mongoURI);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

export default mongoose;
