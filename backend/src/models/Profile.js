// backend/src/models/Profile.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ["USDC", "WLD"],
    required: true
  },
  description: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profilePic: {
      type: String
    },
    earnings: {
      type: Number,
      default: 0
    },
    stakingBalance: {
      type: Number,
      default: 0
    },
    stakingAPY: {
      type: Number,
      default: 0
    },
    reputation: {
      type: Number,
      default: 0
    },
    reviewsSummary: {
      type: String,
      default: ""
    },
    // We'll store transactions separately; alternatively, you can embed them:
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
