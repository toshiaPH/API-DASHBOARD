const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Received a request at ${new Date().toLocaleString()}`);
  next();
});

router.get('/ai', async (req, res) => {
  try {
    const content = encodeURIComponent(req.query.query || '');

    if (!content) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const apiUrl = `https://hercai.onrender.com/v3/hercai?question=${content}`;

    const axiosResponse = await axios.get(apiUrl);

    const responseData = {
      request_count: 1,
      airesponse: axiosResponse.data.reply,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
