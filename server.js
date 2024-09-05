const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Route for fetching quotes by author
app.get('/api/quote/search', async (req, res) => {
  const author = req.query.author;
  try {
    const response = await axios.get(`https://favqs.com/api/quotes/?filter=${author}&type=author`, {
      headers: {
        'Authorization': 'Bearer d9efc5c19c4876b2ee43d19af4dd2c46'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
