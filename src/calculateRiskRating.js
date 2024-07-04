const { Request, Response } = require('express');

// calculateRiskRating.js
function calculateRiskRating(req, res) {
  const { claim_history } = req.body;

  // Check if claim_history is provided in the request body
  if (!claim_history || typeof claim_history !== 'string') {
      return res.status(400).json({ error: 'Invalid input. Claim history must be provided as string' });
  }

  // Define the keyword list
  const keywords = ['collide', 'crash', 'scratch', 'bump', 'smash'];

  // Calculate the risk rating based on the occurrence of keywords
  let risk_rating = 1; // Default risk rating
  for (const keyword of keywords) {
      const occurrences = (claim_history.match(new RegExp(keyword, 'gi')) || []).length;
      risk_rating += occurrences;
  }

  // Send response with the calculated risk rating
  res.json({ risk_rating: Math.min(risk_rating, 5) }); // Cap risk rating to 5
}
module.exports = { calculateRiskRating };
  