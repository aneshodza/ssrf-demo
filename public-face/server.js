const express = require('express');
const axios = require('axios');
const app = express();
const port = 3003;

app.use(express.json());

let userUrls = [];

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/public` });
});

app.get('/api/v1/urls', (req, res) => {
  res.send(userUrls);
});

app.post('/api/v1/add-url', async (req, res) => {
  const url = req.body.url;
  console.log(url);
  console.log(req.body);
  if (!url) {
    return res.status(400).send('URL is required');
  }
  userUrls.push(url);
  res.send('URL added successfully');
});


app.post('/api/v1/fetch', async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(url);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch the URL');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
