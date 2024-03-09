// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Choose your desired port

// Define your API endpoints here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Add endpoint
app.post('/api/add', (_req, res) => {
    // Handle adding data here
    res.send('Data added successfully');
});

// Update endpoint
app.put('/api/update', (_req, res) => {
    // Handle updating data here
    res.send('Data updated successfully');
});

// Count endpoint
let addCount = 0;
let updateCount = 0;

app.get('/api/count', (_req, res) => {
    res.json({ addCount, updateCount });
});
