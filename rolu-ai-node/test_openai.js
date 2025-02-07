// test_openai.js
require('dotenv').config(); // Load environment variables
const axios = require('axios');
const readline = require('readline');

// Create a readline interface to handle user input.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your prompt (or type "exit" to quit): '
  });

// Your OpenAI API key from the environment
const apiKey = process.env.OPENAI_API_KEY;

// Function to call the OpenAI Chat API
async function getChatResponse(userPrompt) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 100,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          }
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error during OpenAI API call:", error.response ? error.response.data : error.message);
      return "Sorry, there was an error processing your request.";
    }
  }

  // Function to prompt the user and display the response
  async function interactiveChat() {
    rl.prompt();

    rl.on('line', async (line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.toLowerCase() === 'exit' || trimmedLine.toLowerCase() === 'quit') {
        rl.close();
        return;
      }

      // Call the OpenAI API with the user's input
      const reply = await getChatResponse(trimmedLine);
      console.log("Assistant reply:", reply);
      rl.prompt();
    }).on('close', () => {
      console.log("Exiting interactive chat. Goodbye!");
      process.exit(0);
    });
  }

  // Start the interactive chat
  interactiveChat();