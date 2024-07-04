const request = require('supertest');
const express = require('express');
const { calculateRiskRating } = require('./calculateRiskRating');

const app = express();
app.use(express.json());
app.post('/calculateRiskRating', calculateRiskRating);

describe('calculateRiskRating', () => {
  it('should return 400 if claim_history is not provided', async () => {
    const res = await request(app)
      .post('/calculateRiskRating')
      .send({});
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid input. Claim history must be provided as string');
  });

  it('should return a risk rating of 1 if no keywords are present', async () => {
    const res = await request(app)
      .post('/calculateRiskRating')
      .send({ claim_history: 'No incidents reported' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('risk_rating', 1);
  });

  it('should calculate the correct risk rating based on the occurrence of keywords', async () => {
    const res = await request(app)
      .post('/calculateRiskRating')
      .send({ claim_history: 'There was a minor bump and a scratch' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('risk_rating', 3); // bump + scratch = 2 + default 1 = 3
  });

  it('should cap the risk rating at 5', async () => {
    const res = await request(app)
      .post('/calculateRiskRating')
      .send({ claim_history: 'collide collide crash crash crash smash smash' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('risk_rating', 5); // Exceeds 5 but should be capped
  });
});
