// src/components/MatchingComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './MatchingComponent.css';

const MatchingComponent = () => {
  const [freelancerProfile, setFreelancerProfile] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState('');

  const handleMatch = async () => {
    if (!freelancerProfile.trim() || !jobDescription.trim()) return;
    try {
      // Call embedding-based matching endpoint
      const matchResponse = await axios.post('/match/embedding', {
        freelancer_profile: freelancerProfile,
        job_description: jobDescription,
      });
      setSimilarityScore(matchResponse.data.similarity_score);

      // Call detailed matching analysis endpoint
      const analysisResponse = await axios.post('/match/detailed', {
        freelancer_profile: freelancerProfile,
        job_description: jobDescription,
      });
      setDetailedAnalysis(analysisResponse.data.analysis);
    } catch (error) {
      console.error('Error fetching matching data:', error);
    }
  };

  return (
    <div className="matching-container">
      <h2>Freelancer & Mission Matching</h2>
      <div className="input-group">
        <label>Freelancer Profile:</label>
        <textarea
          rows="4"
          placeholder="Enter freelancer profile..."
          value={freelancerProfile}
          onChange={(e) => setFreelancerProfile(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Mission/Job Description:</label>
        <textarea
          rows="4"
          placeholder="Enter mission/job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <button onClick={handleMatch}>Get Match Results</button>
      {similarityScore !== null ? (
        <div className="results">
          <h3>Similarity Score: {similarityScore.toFixed(2)} / 100</h3>
          <h4>Detailed Analysis:</h4>
          <pre>{detailedAnalysis}</pre>
        </div>
      ) : (
        <div className="results-placeholder">
          Match results will appear here.
        </div>
      )}
    </div>
  );
};

export default MatchingComponent;
