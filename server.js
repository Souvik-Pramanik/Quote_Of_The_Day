const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Route for fetching quotes by author
app.get('/api/quote/search', async (req, res) => {
    const author = req.query.author;
    const apiUrl = `https://favqs.com/api/quotes/?filter=${encodeURIComponent(author)}&type=author`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Token token="d9efc5c19c4876b2ee43d19af4dd2c46"`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching quote by author:', error.response.data);
        res.status(500).json({ error: 'Error fetching quote by author' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
