Frontend Calls AI Services:

When a recruiter posts a mission or a freelancer updates their profile, the app calls the matching endpoints to get similarity scores and detailed analyses.
The results are used to display real-time recommendations and rank candidates/missions.

Chatbot for Enhanced User Interaction:

The integrated chatbot component allows users (jobseekers or recruiters) to ask questions and get instant, context-aware advice.
This enhances the overall user experience by providing personalized support directly within the app’s interface.

Mathing Simulation Overview:

This simulation script demonstrates how our AI matching service can be used to recommend freelancer profiles to companies and mission posts to freelancers. It uses two main data arrays:

Freelancers: An array of freelancer objects, each containing a name and a profile (a description of skills and experience).
Missions: An array of mission objects, each containing a title and a description.

How the Simulation Works:

Mission-to-Freelancer Matching

For each mission:

Iteration: The script iterates over all freelancer profiles.
Scoring: It computes an embedding-based similarity score between each freelancer's profile and the mission description.
Ranking: Freelancers are then sorted in descending order based on their similarity scores.

Detailed Analysis: the top match is further analyzed using the ChatCompletion function to provide detailed insights (strengths, gaps, and an overall match score).
Freelancer-to-Mission Matching
For each freelancer:

Iteration: The script iterates over all mission descriptions.
Scoring: It computes a similarity score between the freelancer's profile and each mission.
Ranking: Missions are sorted in descending order based on their similarity scores.
Detailed Analysis: the top mission is analyzed in detail using the ChatCompletion function.


Chatbot :

In addition to the matching simulation, we offer an interactive chatbot. This chatbot is designed to deliver personalized, real-time assistance to jobseekers and recruiters. By leveraging the OpenAI API via Axios, the chatbot generates context-aware responses that help users refine their resumes, prepare for interviews, and explore career opportunities. This functionality enhances user engagement by providing immediate, tailored guidance, ultimately streamlining the connection between freelancers and hiring companies.

To simulate the chatbot on your terminal you can run the node test_chatbot.js