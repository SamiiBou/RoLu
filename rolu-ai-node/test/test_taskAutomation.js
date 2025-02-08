// test_taskAutomation.js
require('dotenv').config();
const { automateTask } = require('../taskAutomation');

async function runTaskAutomationTest() {
  try {
    // Example task: scheduling a team meeting with considerations for different time zones.
    const taskDescription = "Schedule a team meeting";
    const context = "The team is distributed across multiple time zones. The meeting should be scheduled at a time that works for everyone and include an agenda for discussion.";

    const result = await automateTask(taskDescription, context);
    console.log("Task Automation Result:\n", result);
  } catch (error) {
    console.error("Error during task automation test:", error);
  }
}

runTaskAutomationTest();
