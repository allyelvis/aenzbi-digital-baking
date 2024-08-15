const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;

// Load SSL certificates for secure API calls
const options = {
  cert: fs.readFileSync('../certs/cert.pem'),
  key: fs.readFileSync('../certs/key.pem')
};

// Middleware
app.use(express.json());

// Sample Visa Direct Integration
app.post('/api/visa/pushFunds', async (req, res) => {
  try {
    const response = await axios.post('https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions', {
      ...req.body
    }, {
      headers: {
        'Authorization': `Basic ${Buffer.from('YOUR_API_KEY:YOUR_SHARED_SECRET').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: new https.Agent(options)
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
