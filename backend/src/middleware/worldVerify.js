// backend/src/middleware/worldVerify.js
//World Verification Authentication Middleware
import jwt from "jsonwebtoken";


export const verifyWorldPayload = (req, res, next) => {
    // Look for the token in cookies
    const token = req.cookies.worldVerificationToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Expect decoded to contain the user's _id
      next();
    } catch (error) {
      console.error("Error in verifyWorldPayload:", error);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };