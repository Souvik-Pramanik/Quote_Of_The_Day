const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Route for fetching quotes by author
app.get('/api/quote/search', async (req, res) => {
    const author = req.query.author;
    const apiUrl = `https://favqs.com/api/quotes/?filter=${encodeURIComponent(author)}&type=author`;

    console.log(`API URL: ${apiUrl}`); // Log the URL for debugging

    try {
        // Forward the request to FavQs with the authorization token
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Token token="d9efc5c19c4876b2ee43d19af4dd2c46"`
            }
        });
        console.log('API Response:', response.data); // Log the response for debugging
        res.json(response.data); // Send the data back to the frontend
    } catch (error) {
        console.error('Error fetching quote by author:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching quote by author' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
