import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import bodyParser from "body-parser";
import { verifySiweMessage } from "@worldcoin/minikit-js";

const app = express();
const port = process.env.PORT || 3001;
console.log("=== Initializing back-end server ===");

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
  "https://d3fe-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app"
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

  if (!storedNonce) {
    console.error("Error: Invalid or expired nonceId.");
    res.json({
      status: "error",
      isValid: false,
      message: "Invalid or expired nonceId",
    });
    return;
  }

  if (nonce !== storedNonce) {
    console.error("Error: Invalid nonce. Received:", nonce, "| Stored nonce:", storedNonce);
    res.json({
      status: "error",
      isValid: false,
      message: "Invalid nonce",
    });
    return;
  }

  try {
    console.log("Calling verifySiweMessage with payload and nonce...");
    const validMessage = await verifySiweMessage(payload, nonce);
    console.log("Result of verifySiweMessage:", validMessage);
    // Optionally: delete the nonce to prevent reuse
    delete nonceStore[nonceId];
    res.json({
      status: "success",
      isValid: validMessage.isValid,
    });
    console.log("Response sent for /api/complete-siwe successfully");
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

app.listen(port, () => {
  console.log(`=== Back-end server started on port ${port} ===`);
});
