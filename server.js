const cors = require("cors");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

// Parse JSON
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(__dirname));

// Connect to SQLite database
const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create users table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        login_time DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

app.post("/save-user", (req, res) => {

    console.log("Request received");
    console.log(req.body);

    const { name, phone } = req.body;

    const sql = "INSERT INTO users (name, phone) VALUES (?, ?)";

    db.run(sql, [name, phone], function(err) {

        if (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }

        console.log("Inserted:", this.lastID);

        res.json({ success: true });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});