const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const marketData = req.body.data;
  const response = await axios.post('http://localhost:5000/predict', marketData);
  const rate = response.data.interest_rate;
  res.json({
    jobRunID: req.body.id,
    data: { rate },
    result: rate,
    statusCode: 200
  });
});

app.listen(8080, () => console.log('Oracle Adapter running on port 8080'));
