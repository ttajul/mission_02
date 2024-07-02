import { Request, Response } from 'express';

// calculateRiskRating.js
function calculateRiskRating(req, res) {
    const claimHistory = req.body.claim_history || '';
    let riskRating = 1;
  
    const keywords = ['crash', 'bump', 'collided', 'scratched', 'smashed'];
    const count = keywords.reduce((acc, keyword) => {
      return acc + (claimHistory.includes(keyword) ? 1 : 0);
    }, 0);
  
    if (count > 0) {
      riskRating = count;
    }
  
    res.json({ risk_rating: riskRating });
  }
  
  module.exports = { calculateRiskRating };
  