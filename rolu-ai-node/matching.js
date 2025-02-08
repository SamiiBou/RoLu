// matching.js
const axios = require('axios');
const { openaiApiKey } = require('./config');

/**
 * Preprocess text by lowercasing and trimming extra whitespace.
 * (You may add more sophisticated preprocessing as needed.)
 */
function preprocessText(text) {
    return text.toLowerCase().trim();
  }

/**
 * Get the embedding vector for a given text.
 */
async function getEmbedding(text, model = "text-embedding-ada-002") {
    const processedText = preprocessText(text);
    try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: model,
        input: processedText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.data[0].embedding;
  } catch (error) {
    throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

/**
 * Compute cosine similarity between two vectors.
 */
function cosineSimilarity(vec1, vec2) {
  if (vec1.length !== vec2.length) {
    throw new Error("Vectors must be of the same length");
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    normA += vec1[i] ** 2;
    normB += vec2[i] ** 2;
  }
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (normA * normB);
}

/**
 * Return a similarity score (0-100) using embeddings.
 */
async function matchUsingEmbeddings(freelancerProfile, jobDescription) {
    // Preprocess texts
    const processedFreelancer = preprocessText(freelancerProfile);
    const processedJob = preprocessText(jobDescription);

    const profileEmbedding = await getEmbedding(processedFreelancer);
    const jobEmbedding = await getEmbedding(processedJob);
    const similarity = cosineSimilarity(profileEmbedding, jobEmbedding);
    return similarity * 100;
  }

/**
 * Use ChatCompletion to generate a detailed match analysis.
 */
async function matchFreelancerToJob(freelancerProfile, jobDescription) {
    // Preprocess texts
    const processedFreelancer = preprocessText(freelancerProfile);
    const processedJob = preprocessText(jobDescription);

    const prompt = `
  You are an expert job matching assistant. Analyze the freelancer profile and the job description provided below.
  - Identify the key skills required for the job.
  - Compare these with the skills and experiences mentioned in the freelancer profile.
  - If there is a clear role mismatch (for example, the job requires a developer but the profile is for a copywriter), adjust the match score accordingly.
  - Provide a match score between 0 and 100 (with 100 being a perfect match).
  - Provide a detailed explanation including:
    • Strengths: What aspects of the freelancer’s profile match the job requirements.
    • Gaps: Key areas where the freelancer’s profile does not meet the job requirements.
    • Overall Summary: A concise conclusion about the overall fit.

  Freelancer Profile:
  ${processedFreelancer}

  Job Description:
  ${processedJob}

  Format your answer exactly as follows:
  Match Score: <score out of 100>
  Strengths:
  1. ...
  Gaps:
  1. ...
  Overall Summary: ...
    `;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a job matching assistant." },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
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
      throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
    }
  }

  module.exports = {
    matchUsingEmbeddings,
    matchFreelancerToJob,
  };
/**
 * Use ChatCompletion to generate a detailed match analysis.
 */
async function matchFreelancerToJob(freelancerProfile, jobDescription) {
  // Preprocess texts
  const processedFreelancer = preprocessText(freelancerProfile);
  const processedJob = preprocessText(jobDescription);

  const prompt = `
You are an expert job matching assistant. Analyze the freelancer profile and the job description provided below.
- Identify the key skills required for the job.
- Compare these with the skills and experiences mentioned in the freelancer profile.
- If there is a clear role mismatch (for example, the job requires a developer but the profile is for a copywriter), adjust the match score accordingly.
- Provide a match score between 0 and 100 (with 100 being a perfect match).
- Provide a detailed explanation including:
  • Strengths: What aspects of the freelancer’s profile match the job requirements.
  • Gaps: Key areas where the freelancer’s profile does not meet the job requirements.
  • Overall Summary: A concise conclusion about the overall fit.

Freelancer Profile:
${processedFreelancer}

Job Description:
${processedJob}

Format your answer exactly as follows:
Match Score: <score out of 100>
Strengths:
1. ...
Gaps:
1. ...
Overall Summary: ...
  `;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a job matching assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
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
    throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

module.exports = {
  matchUsingEmbeddings,
  matchFreelancerToJob,
};