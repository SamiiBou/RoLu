// backend/src/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { randomUUID } from "crypto";
import { verifySiweMessage } from "@worldcoin/minikit-js";
import dotenv from "dotenv";
import "./db.js"; // Import database connection
import { Job } from "../models/Job.js";
import multer from "multer"; // Ajout de multer
import path from "path";

dotenv.config();

//import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import { Profile } from "./models/Profile.js";
import { verifyWorldPayload } from "./middleware/worldVerify.js";

const app = express();
const port = process.env.PORT || 3001;
console.log("PORT env variable:", process.env.PORT);

// Configuration de multer pour les uploads de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
  },
});
const upload = multer({ storage: storage });
console.log("=== Initializing back-end server ===");

// Use cookie parser before your routes
app.use(cookieParser());
// Connect to MongoDB
connectDB();

// In-memory storage for nonces associated with an identifier
const nonceStore = {};

// In-memory storage for payment references
const paymentStore = {};

// Middleware pour servir les fichiers statiques (images)
app.use('/uploads', express.static('uploads'));

// Allowed origins for CORS
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
  "https://461216866e90.ngrok.app",
  "https://022d9a9411c8.ngrok.app",
  "https://d845-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://d3fe-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://43d6-2001-861-3886-8100-f405-cace-5273-602f.ngrok-free.app",
  "https://cd5d-2001-861-3886-8100-9e5-b1b8-af70-a68e.ngrok-free.app",
  "https://2aa3-2001-861-3886-8100-9e5-b1b8-af70-a68e.ngrok-free.app"

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
app.use(bodyParser.json());

// Global logging middleware
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Received request: ${req.method} ${req.url}`);
  console.log("Received Headers:", req.headers);
  console.log("Received Body:", req.body);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.status(err.status || 500).json({ error: err.message });
});

// SIWE nonce and payment endpoints
//const nonceStore = {};
app.get("/api/nonce", (req, res) => {
  console.log("=== Received GET /api/nonce request ===");
  const nonce = randomUUID().replace(/-/g, "");
  const nonceId = randomUUID();
  nonceStore[nonceId] = nonce;
  console.log("Generated nonce:", nonce);
  console.log("Generated nonceId:", nonceId);
  res.json({ nonce, nonceId });
});

app.post("/api/complete-siwe", async (req, res) => {
  const { payload, nonce, nonceId } = req.body;
  const storedNonce = nonceStore[nonceId];
  if (!storedNonce || nonce !== storedNonce) {
    return res.json({
      status: "error",
      isValid: false,
      message: "Invalid or expired nonceId",
    });
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
      } else {
        res.json({
          status: "error",
          isValid: false,
          message: "Verification failed",
        });
      }
  } catch (error) {
    res.json({
      status: "error",
      isValid: false,
      message: error.message,
    });
  }
});

//const paymentStore = {};
app.post("/api/initiate-payment", (req, res) => {
  const paymentId = "0x" + randomUUID().replace(/-/g, "");
  paymentStore[paymentId] = { status: "pending" };
  res.json({ id: paymentId });
});

app.post("/api/confirm-payment", (req, res) => {
  const { reference, status } = req.body;
  if (!paymentStore[reference]) {
    return res.json({ success: false, message: "Payment reference not found" });
  }
  if (status === "success") {
    paymentStore[reference].status = "completed";
    return res.json({ success: true });
  } else {
    paymentStore[reference].status = "failed";
    return res.json({ success: false, message: "Payment failed" });
  }
});

// Job CRUD operations

// GET /api/jobs - Retrieve all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/jobs/:id - Retrieve a single job by id
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/jobs - Create a new job with image upload
app.post("/api/jobs", upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      location,
      salary,
      duration,
      skills,
      deadline,
      applyLink,
      company,
      responsibilities,
      qualifications,
    } = req.body;

    console.log("Received job data:", req.body);
    console.log("Received file:", req.file);

    const imagePath = req.file ? `/uploads/${req.file.filename}` : ''; // Chemin de l'image

    const newJob = new Job({
      title,
      type,
      description,
      image: imagePath, // Enregistrement du chemin de l'image
      location,
      salary,
      duration,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim()),
      deadline,
      applyLink,
      company,
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities
        : responsibilities.split(",").map((r) => r.trim()),
      qualifications: Array.isArray(qualifications)
        ? qualifications
        : qualifications.split(",").map((q) => q.trim()),
    });

    const savedJob = await newJob.save();
    console.log("Job saved successfully:", savedJob);
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/jobs/:id - Update a job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/jobs/:id - Delete a job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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