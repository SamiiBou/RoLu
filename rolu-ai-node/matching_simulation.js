// matching_simulation.js
const { matchUsingEmbeddings, matchFreelancerToJob } = require("./matching");

// A list of freelancer profiles
const freelancers = [
  {
    name: "John Doe",
    profile: "John is a full-stack developer with 5 years of experience in Python, JavaScript, and Django. He has built several e-commerce websites and integrated payment systems."
  },
  {
    name: "Alice Smith",
    profile: "Alice is a graphic designer with 3 years of experience in Adobe Photoshop and Illustrator. She creates stunning visuals for digital and print media."
  },
  {
    name: "Bob Johnson",
    profile: "Bob is a blockchain developer with 2 years of experience in Solidity and smart contract development. He has deployed several decentralized applications on Ethereum."
  },
  {
    name: "Cindy Lee",
    profile: "Cindy is an SEO specialist with a strong background in optimizing website content and improving search engine rankings for various online businesses."
  },
  {
    name: "Erin White",
    profile: "Erin is a technical copywriter experienced in creating engaging content for tech companies and explaining complex technical concepts in a clear way."
  }
];

// A list of mission posts (job descriptions)
const missions = [
  {
    title: "E-commerce Platform Development",
    description: "We need a developer to build an e-commerce platform with custom payment gateway integrations. Experience in Django and JavaScript is required."
  },
  {
    title: "Marketing Material Design",
    description: "Looking for a creative graphic designer to design marketing materials, including brochures and digital ads, for our tech startup."
  },
  {
    title: "Decentralized Application Development",
    description: "Seeking a blockchain developer to build decentralized applications on Ethereum. Solidity experience is a must."
  },
  {
    title: "SEO Optimization",
    description: "Need an SEO specialist to improve our website's search engine rankings and drive more organic traffic."
  },
  {
    title: "Technical Content Writing",
    description: "Looking for a technical writer who can create engaging and detailed content about our SaaS product, including white papers and blog posts."
  }
];

async function runSimulation() {
  console.log("=== Matching Missions to Freelancers ===\n");
  // For each mission, rank freelancers by similarity score.
  for (let mission of missions) {
    console.log(`\n--- Mission: ${mission.title} ---`);
    console.log(`Description: ${mission.description}\n`);
    let freelancerMatches = [];
    for (let freelancer of freelancers) {
      try {
        const score = await matchUsingEmbeddings(freelancer.profile, mission.description);
        freelancerMatches.push({ freelancerName: freelancer.name, score });
      } catch (error) {
        console.error(`Error matching ${freelancer.name} with mission "${mission.title}":`, error.message);
      }
    }
    // Sort freelancers by similarity score (highest first)
    freelancerMatches.sort((a, b) => b.score - a.score);
    console.log("Freelancer Ranking (by Embedding Similarity):");
    freelancerMatches.forEach(match => {
      console.log(`  ${match.freelancerName}: ${match.score.toFixed(2)} out of 100`);
    });
    // Optionally, show a detailed analysis for the top match.
    if (freelancerMatches.length > 0) {
      const topFreelancer = freelancers.find(f => f.name === freelancerMatches[0].freelancerName);
      console.log("\nDetailed Analysis for Top Freelancer:");
      try {
        const analysis = await matchFreelancerToJob(topFreelancer.profile, mission.description);
        console.log(analysis);
      } catch (error) {
        console.error("Error during detailed analysis:", error.message);
      }
    }
  }

  console.log("\n\n=== Matching Freelancers to Missions ===\n");
  // For each freelancer, rank missions by similarity score.
  for (let freelancer of freelancers) {
    console.log(`\n--- Freelancer: ${freelancer.name} ---`);
    console.log(`Profile: ${freelancer.profile}\n`);
    let missionMatches = [];
    for (let mission of missions) {
      try {
        const score = await matchUsingEmbeddings(freelancer.profile, mission.description);
        missionMatches.push({ missionTitle: mission.title, score });
      } catch (error) {
        console.error(`Error matching mission "${mission.title}" for ${freelancer.name}:`, error.message);
      }
    }
    // Sort missions by similarity score (highest first)
    missionMatches.sort((a, b) => b.score - a.score);
    console.log("Mission Ranking (by Embedding Similarity):");
    missionMatches.forEach(match => {
      console.log(`  ${match.missionTitle}: ${match.score.toFixed(2)} out of 100`);
    });
    // Optionally, show a detailed analysis for the top mission.
    if (missionMatches.length > 0) {
      const topMission = missions.find(m => m.title === missionMatches[0].missionTitle);
      console.log("\nDetailed Analysis for Top Mission:");
      try {
        const analysis = await matchFreelancerToJob(freelancer.profile, topMission.description);
        console.log(analysis);
      } catch (error) {
        console.error("Error during detailed analysis:", error.message);
      }
    }
  }
}

runSimulation();
