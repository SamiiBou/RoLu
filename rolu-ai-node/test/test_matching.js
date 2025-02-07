// test_matching.js
const { matchUsingEmbeddings, matchFreelancerToJob } = require("../matching");

const freelancerProfile = "John is a full-stack developer with 5 years of experience in Python, JavaScript, and Django. He has built several e-commerce websites and integrated payment systems.";
const jobDescription = "We need a developer to build an e-commerce platform with custom payment gateway integrations. Experience in Django and JavaScript is required.";

async function runTests() {
  try {
    const similarityScore = await matchUsingEmbeddings(freelancerProfile, jobDescription);
    console.log(`Semantic Similarity Score: ${similarityScore.toFixed(2)} out of 100`);

    const detailedAnalysis = await matchFreelancerToJob(freelancerProfile, jobDescription);
    console.log("Detailed Match Analysis:\n", detailedAnalysis);
  } catch (error) {
    console.error("Error during matching tests:", error.message);
  }
}

runTests();
