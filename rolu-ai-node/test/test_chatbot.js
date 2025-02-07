// test_chatbot.js
require('dotenv').config(); // Load environment variables
const readline = require('readline');
const { updateConversation } = require('./chatbot');

// Create a readline interface to capture terminal input.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You: '
});

// Initialize conversation history with a system prompt.
// This context ensures that the chatbot behaves as a helpful assistant for jobseekers and recruiters.
let conversationHistory = [
  { role: 'system', content: 'You are a helpful assistant for jobseekers and recruiters.' }
];

console.log("Interactive Chatbot Test");
console.log("Type your message and press Enter. Type 'exit' or 'quit' to end the session.\n");

// Start the prompt.
rl.prompt();

// Listen for each line of user input.
rl.on('line', async (line) => {
  const input = line.trim();

  // Check for exit conditions.
  if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
    console.log("Exiting chat. Goodbye!");
    rl.close();
    process.exit(0);
  }

  try {
    // Use your chatbot function to update the conversation.
    const { conversationHistory: updatedHistory, botReply } = await updateConversation(conversationHistory, input);
    // Update the conversation history for context.
    conversationHistory = updatedHistory;
    console.log(`Assistant: ${botReply}\n`);
  } catch (error) {
    console.error("Error during chat:", error.message);
  }

  // Display the prompt again for the next input.
  rl.prompt();
}).on('close', () => {
  console.log("Chat session ended.");
});
