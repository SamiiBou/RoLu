import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { randomUUID } from "crypto";
import bodyParser from "body-parser";
import { verifySiweMessage } from "@worldcoin/minikit-js";

const app = express();
const port = process.env.PORT || 3001;
console.log("=== Initialisation du serveur back-end ===");

// Liste des origines autorisées
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://02ca-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://5c02-2001-861-3886-8100-1473-61d5-d223-12e1.ngrok-free.app",
  "https://403f-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://fg9jqsnhnj.loclx.io",
  "https://b15e65c90fd4.ngrok.app",
  "https://5d66ebe5ec90.ngrok.app",
  "https://d845-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app",
  "https://d3fe-2001-861-3886-8100-bda3-b75e-a8cf-483e.ngrok-free.app"
];
console.log("Liste des origines autorisées pour CORS :", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
 };
 
 app.use(cors(corsOptions));

// Configuration CORS avec logs
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Requête CORS depuis l'origine :", origin);
      // Autorise les requêtes sans origine (ex. Postman) ou si l'origine est dans la liste
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      console.error("Origine non autorisée :", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // Permet l'envoi des cookies
  })
);

// Middleware pour parser les cookies et le JSON
app.use(cookieParser());
app.use(bodyParser.json());

// Middleware de logging global
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers reçus:", req.headers);
  console.log("Body reçu:", req.body);
  next();
});

// Endpoint pour générer le nonce
app.get("/api/nonce", (req, res) => {
  console.log("=== Requête GET /api/nonce reçue ===");
  console.log("Origine de la requête :", req.headers.origin);
  const nonce = randomUUID().replace(/-/g, "");
  console.log("Nonce généré :", nonce);
  // Définition du cookie avec le nonce
  res.cookie("siwe", nonce, {
    httpOnly: true,
    secure: true, // Nécessite HTTPS – passez à false en développement si besoin
    sameSite: "none", // Pour autoriser les requêtes cross-site
  });
  console.log('Cookie "siwe" défini avec le nonce :', nonce);
  res.json({ nonce });
  console.log('Réponse envoyée pour /api/nonce');
});

// Endpoint pour vérifier la signature SIWE
app.post("/api/complete-siwe", async (req, res) => {
  console.log("--- Requête POST /api/complete-siwe reçue ---");
  const { payload, nonce } = req.body;
  console.log("Payload reçu:", payload);
  console.log("Nonce reçu dans le body:", nonce);
  const storedNonce = req.cookies.siwe;
  console.log("Nonce stocké dans le cookie:", storedNonce);
  if (nonce !== storedNonce) {
    console.error(
      "Erreur: Nonce invalide. Nonce reçu:",
      nonce,
      "| Nonce stocké:",
      storedNonce
    );
    res.json({
      status: "error",
      isValid: false,
      message: "Nonce invalide",
    });
    return;
  }
  try {
    console.log("Appel de verifySiweMessage avec payload et nonce...");
    const validMessage = await verifySiweMessage(payload, nonce);
    console.log("Résultat de verifySiweMessage:", validMessage);
    res.json({
      status: "success",
      isValid: validMessage.isValid,
    });
    console.log("Réponse envoyée pour /api/complete-siwe avec succès");
  } catch (error) {
    console.error("Erreur lors de la vérification SIWE:", error);
    res.json({
      status: "error",
      isValid: false,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`=== Serveur back-end démarré sur le port ${port} ===`);
});
