const express = require("express");
const cors = require("cors");
const path = require("path");

const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

// Firebase Admin Key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase
admin.initializeApp({
    credential: admin.cert(serviceAccount)
});
const db = getFirestore();
console.log("Project ID:", serviceAccount.project_id);
console.log("Client Email:", serviceAccount.client_email);
// Firestore

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Save user to Firestore
app.post("/save-user", async (req, res) => {
    try {

        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                error: "Name and phone are required"
            });
        }

        await db.collection("users").add({
            name,
            phone,
            createdAt: new Date()
        });

        console.log("User saved successfully!");

        res.json({
            success: true
        });

    } catch (err) {

        console.error("FULL ERROR:");
        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});