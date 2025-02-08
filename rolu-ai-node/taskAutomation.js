// taskAutomation.js
const axios = require('axios');
const { openaiApiKey } = require('./config');


/**
 * NOTE:
 * This task automation model is intended to evolve into a full AI agent that has access
 * to various useful tools (e.g., calendar, email, and others). This will enable the agent
 * to take concrete actions (such as scheduling meetings or sending emails) based on its
 * generated plans.
 *
 * For now, it focuses on generating clear, structured, and actionable plans for a given task.
 */

/**
 * Automate a task using OpenAI's API.
 *
 * @param {string} taskDescription - A clear description of the task you want to automate.
 * @param {string} [context=""] - Optional additional context or background.
 * @returns {Promise<string>} - The assistant's response containing the actionable plan or automated output.
 */
async function automateTask(taskDescription, context = "") {
  // Build a prompt that explains the task and asks for a structured response.
  const prompt = `
You are an advanced task automation assistant with deep knowledge in productivity, workflow optimization, and system integration. Your job is to provide a clear, actionable, and detailed plan to automate the following task.

Task Description: ${taskDescription}
Context: ${context}

Your response should include:
1. A brief summary of the task.
2. A detailed, step-by-step guide in a numbered or bullet-point list.
3. Any potential obstacles or dependencies that need to be considered.
4. Additional recommendations or best practices to optimize the process.
5. A final summary of key action items.

Ensure your response is precise, comprehensive, and written in plain language that is easily understood by both technical and non-technical audiences.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages: [
            {
              role: "system",
              content: "You are an advanced task automation assistant that provides clear, structured, and actionable guidance."
            },
            {
              role: "user",
              content: prompt
            }
          ],
        temperature: 0.3,
        max_tokens: 250,
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
    throw new Error(
      error.response
        ? JSON.stringify(error.response.data)
        : error.message
    );
  }
}

module.exports = {
  automateTask,
};
