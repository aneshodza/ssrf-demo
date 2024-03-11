const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/public` });
});

app.get('/api/v1/customer-data', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/db-proxy?query=select%20*%20from%20customers');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch the URL');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
