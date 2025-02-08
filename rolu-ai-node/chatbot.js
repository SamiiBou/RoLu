// chatbot.js
const axios = require('axios');
const { openaiApiKey } = require('./config');

/**
 * Generate a chat response given the conversation history.
 * @param {Array} conversationHistory - Array of message objects with 'role' and 'content'
 * @returns {string} - The assistant's response
*/
async function generateChatResponse(conversationHistory) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages: conversationHistory,
        temperature: 0.5,
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

/**
 * Update the conversation with the user message and generate the assistant reply.
 * If the conversation history is empty, initialize it with a system prompt and an initial greeting.
 * @param {Array} conversationHistory - Array of message objects
 * @param {string} userMessage - The user's message to append
 * @returns {object} - Updated conversation history and the assistant's reply
 */
async function updateConversation(conversationHistory, userMessage) {
    // Initialization: if conversation is empty, add system prompt and initial greeting.
    if (conversationHistory.length === 0) {
      // System prompt: instruct the assistant on its role, style, and format.
      conversationHistory.push({
        role: "system",
        content:
        "You are a highly articulate and helpful assistant for freelancers and recruiters. Your role is to simulate job interviews, evaluate responses, and assist with refining and preparing resumes. " +
        "Always provide complete, clear, and structured answers that include bullet points, numbered lists, or short paragraphs as needed. " +
        "If a response might be truncated by token limits, summarize in a clear and concise manner without losing important details. " +
        "Help recruiters and jobseekers with all aspects of their processes, from interview preparation to resume refinement and job matching. " +
        "Be friendly, direct, and precise in your guidance.",
      });
      // Initial greeting message.
      const initialGreeting =
        "Hello! I'm your RoLu assistant. I can help you prepare for interviews, improve your resume, and provide guidance on job matching. " +
        "Are you a jobseeker or a recruiter? How can I assist you today?";
      conversationHistory.push({
        role: "assistant",
        content: initialGreeting,
      });
      // If no user message is provided, return the initial greeting.
      if (!userMessage.trim()) {
        return { conversationHistory, botReply: initialGreeting };
      }
    }

    // Append the user's message.
    conversationHistory.push({ role: "user", content: userMessage });
    // Generate the assistant's reply.
    const botReply = await generateChatResponse(conversationHistory);
    conversationHistory.push({ role: "assistant", content: botReply });
    return { conversationHistory, botReply };
  }

  module.exports = {
    updateConversation,
  };