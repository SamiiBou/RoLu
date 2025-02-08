// chatbot.js
const axios = require('axios');
const { openaiApiKey } = require('./config');

/**
 * Generate a chat response given the conversation history.
 * @param {Array} conversationHistory - Array of message objects with 'role' and 'content'
 */
async function generateChatResponse(conversationHistory) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages: conversationHistory,
        temperature: 0.5,
        max_tokens: 150,
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
 */
async function updateConversation(conversationHistory, userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });
  const botReply = await generateChatResponse(conversationHistory);
  conversationHistory.push({ role: "assistant", content: botReply });
  return { conversationHistory, botReply };
}

module.exports = {
  updateConversation,
};
