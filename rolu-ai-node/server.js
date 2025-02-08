// server.js
const express = require("express");
const { matchUsingEmbeddings, matchFreelancerToJob } = require("./matching");
const { updateConversation } = require("./chatbot");
const { port } = require("./config");

const app = express();
app.use(express.json());

// In-memory store for chatbot sessions (for demonstration purposes only)
const chatSessions = {};

/**
 * Endpoint: Embedding-based matching
 * Request Body: { freelancer_profile: string, job_description: string }
 */
app.post("/match/embedding", async (req, res) => {
  try {
    const { freelancer_profile, job_description } = req.body;
    const score = await matchUsingEmbeddings(freelancer_profile, job_description);
    res.json({ similarity_score: Number(score.toFixed(2)) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint: Detailed matching analysis using ChatCompletion
 * Request Body: { freelancer_profile: string, job_description: string }
 */
app.post("/match/detailed", async (req, res) => {
  try {
    const { freelancer_profile, job_description } = req.body;
    const analysis = await matchFreelancerToJob(freelancer_profile, job_description);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint: Chatbot conversation for jobseekers/recruiters.
 * Request Body: { session_id?: string, message: string }
 */
app.post("/chat", async (req, res) => {
  try {
    const { session_id, message } = req.body;
    const sessionId = session_id || "default";
    if (!chatSessions[sessionId]) {
      // Initialize conversation history with a system prompt.
      chatSessions[sessionId] = [{ role: "system", content: "You are a helpful assistant for jobseekers and recruiters." }];
    }
    const conversationHistory = chatSessions[sessionId];
    const result = await updateConversation(conversationHistory, message);
    chatSessions[sessionId] = result.conversationHistory;
    res.json({ reply: result.botReply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
