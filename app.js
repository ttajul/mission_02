const express = require('express');
const bodyParser = require('body-parser');
const { calculateRiskRating } = require('./src/calculateRiskRating.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/calculate_risk_rating', calculateRiskRating);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});