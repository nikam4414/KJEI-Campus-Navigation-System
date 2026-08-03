const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Read JSON data sent from the frontend
app.use(express.json());

// Serve your frontend files
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});