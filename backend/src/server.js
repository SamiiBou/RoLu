// backend/src/server.js
import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import bodyParser from "body-parser";
import { verifySiweMessage } from "@worldcoin/minikit-js";

//import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import { Profile } from "./models/Profile.js";
import { verifyWorldPayload } from "./middleware/worldVerify.js";

const app = express();
const port = process.env.PORT || 3001;
console.log("=== Initializing back-end server ===");

import dotenv from "dotenv";
dotenv.config();

// Use cookie parser before your routes
app.use(cookieParser());
// Connect to MongoDB
connectDB();

// In-memory storage for nonces associated with an identifier
const nonceStore = {};

// In-memory storage for payment references
const paymentStore = {};

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://02ca-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://5c02-2001-861-3886-8100-1473-61d5-d223-12e1.ngrok-free.app",
  "https://403f-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://fg9jqsnhnj.loclx.io",
  "https://b15e65c90fd4.ngrok.app",
  "https://33433194a3de.ngrok.app",
  "https://4c59b6020b42.ngrok.app",
  "https://d845-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://d3fe-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://43d6-2001-861-3886-8100-f405-cace-5273-602f.ngrok-free.app"
];
console.log("Allowed origins for CORS:", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(bodyParser.json());

// Global logging middleware
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Received Headers:", req.headers);
  console.log("Received Body:", req.body);
  next();
});

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.status(err.status || 500).json({ error: err.message });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint to generate a nonce and associated identifier (nonceId)
app.get("/api/nonce", (req, res) => {
  console.log("=== Received GET /api/nonce request ===");
  console.log("Request Origin:", req.headers.origin);
  const nonce = randomUUID().replace(/-/g, "");
  const nonceId = randomUUID();
  nonceStore[nonceId] = nonce;
  console.log("Generated nonce:", nonce);
  console.log("Generated nonceId:", nonceId);
  console.log("Stored nonce in memory:", nonceStore);

  res.json({ nonce, nonceId });
  console.log("Response sent for /api/nonce");
});

// Endpoint to verify the SIWE signature
app.post("/api/complete-siwe", async (req, res) => {
  console.log("--- Received POST /api/complete-siwe request ---");
  const { payload, nonce, nonceId } = req.body;
  console.log("Received payload:", payload);
  console.log("Received nonce in body:", nonce);
  console.log("Received nonceId in body:", nonceId);

  const storedNonce = nonceStore[nonceId];
  console.log("Stored nonce for nonceId:", storedNonce);

  if (!storedNonce || nonce !== storedNonce) {
    console.error("Error: Invalid or expired nonceId.");
    res.json({
      status: "error",
      isValid: false,
      message: "Invalid or expired nonceId",
    });
    return;
  }
  try {
      console.log("Calling verifySiweMessage with payload and nonce...");
      const validMessage = await verifySiweMessage(payload, nonce);
      console.log("Result of verifySiweMessage:", validMessage);
      if (validMessage.isValid) {
        let user = await Profile.findOne({ ethereumAddress: payload.address });
        if (!user) {
          user = await Profile.create({
            ethereumAddress: payload.address,
            username: payload.address,
            fullName: "New User",
            email: "",
            profilePic: "",
          });
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set the token in a cookie
        res.cookie("worldVerificationToken", token, {
          httpOnly: true, // Prevents JavaScript access to the cookie
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "strict", // Prevents CSRF attacks
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
        });

        res.json({
          status: "success",
          isValid: true,
        });

  } catch (error) {
    console.error("Error during SIWE verification:", error);
    res.json({
      status: "error",
      isValid: false,
      message: error.message,
    });
  }
});

// New endpoint to initiate payment
// Updated payment initiation endpoint
app.post("/api/initiate-payment", (req, res) => {
  console.log("=== Received POST /api/initiate-payment request ===");
  const paymentId = "0x" + randomUUID().replace(/-/g, "");
  // Store the payment reference in memory
  paymentStore[paymentId] = { status: "pending" };
  console.log("Payment initiated with id:", paymentId);
  res.json({ id: paymentId });
});


// New endpoint to confirm payment
app.post("/api/confirm-payment", (req, res) => {
  console.log("=== Received POST /api/confirm-payment request ===");
  const { reference, status, transaction_id } = req.body;
  console.log("Payload received:", req.body);

  // Check if the payment reference exists
  if (!paymentStore[reference]) {
    console.error("Payment reference not found:", reference);
    return res.json({ success: false, message: "Payment reference not found" });
  }

  // For demonstration, confirm the payment if status is "success"
  if (status === "success") {
    paymentStore[reference].status = "completed";
    console.log("Payment confirmed for reference:", reference);
    return res.json({ success: true });
  } else {
    paymentStore[reference].status = "failed";
    console.error("Payment failed for reference:", reference);
    return res.json({ success: false, message: "Payment failed" });
  }
});

// Production-ready Profile Endpoint using World Verification
app.get("/api/profile", verifyWorldPayload, async (req, res) => {
  console.log("=== GET /api/profile request for user:", req.user._id);
  try {
    const profile = await Profile.findById(req.user._id).populate({
      path: "transactions",
      populate: {
        path: "sender receiver",
        select: "fullName username profilePic", // Only include necessary fields
      },
    });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ profile });
    console.log("Profile response sent.");
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`=== Back-end server started on port ${port} ===`);
});
