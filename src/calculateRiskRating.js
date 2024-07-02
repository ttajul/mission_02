import { Request, Response } from 'express';



export function calculateRiskRating(req, res) {
    const {claim_history} = req.body;

    //check if claim_history is provided in the request body
    if (!claim_history || typeof claim_history !== 'string') {
        return res.status(400).json({error: 'Invalid input. Claim history must be provided as string'
    });
    }

    // define the keyword list
    const keywords = ['collide', 'crash', 'scratch', 'bump', 'smash'];

    // calculate the risk rating based on the occurrence of keywords
    let risk_rating = 1; //default risk rating
    for (const keyword of keywords) {
        const occurrences = (claim_history.match(new RegExp(keyword, 'gi'))
        || []).length;
        risk_rating += occurrences
    }

    // send res with the calculated  risk rating
    res.json({risk_rating: Math.min(risk_rating, 5)}); // cap risk rating to 5
}

module.exports = calculateRiskRating;