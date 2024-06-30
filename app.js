import express from 'express';
import bodyParser from 'body-parser';
import { calculateRiskRating } from '';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/calculate_risk_rating', calculateRiskRating)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
