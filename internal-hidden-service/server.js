const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// Replace with your actual MySQL connection details
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'customer_data',
  port: 3306, // Default MySQL port, change if necessary
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/v1/docs', (req, res) => {
  res.sendFile('api-v1-docs.html', { root: `${__dirname}/public` });
}

app.get('/api/v1/db-proxy', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send('Query parameter is required');
  }

  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Failed to execute query');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
