// backend/src/seedProfiles.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Profile } from "./models/Profile.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");
    // Clear existing profiles
    await Profile.deleteMany({});

    // Create two profiles
    const sophia = await Profile.create({
      username: "john_doe",
      fullName: "Sophia Calzoni",
      email: "sophia@example.com",
      profilePic: "https://via.placeholder.com/150",
      earnings: 6564,
      stakingBalance: 624,
      stakingAPY: 10,
      reputation: 4.76,
      reviewsSummary: "Excellent performance with high client satisfaction.",
      transactions: [],
    });

    const tiana = await Profile.create({
      username: "tiana_saris",
      fullName: "Tiana Saris",
      email: "tiana@example.com",
      profilePic: "https://via.placeholder.com/150",
      earnings: 3000,
      stakingBalance: 200,
      stakingAPY: 8,
      reputation: 4.5,
      reviewsSummary: "Very professional and reliable.",
      transactions: [],
    });

    // Create transactions:  a transaction from Tiana to Sophia
    const transaction = {
      sender: tiana._id,
      receiver: sophia._id,
      amount: 43,
      currency: "USDC",
      description: "Payment for services",
      timestamp: new Date(),
    };

    // Add this transaction to Sophia's profile
    sophia.transactions.push(transaction);
    await sophia.save();

    console.log("Profiles seeded successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
