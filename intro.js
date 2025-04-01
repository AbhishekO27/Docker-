require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB Connection URL
const MONGO_URL = `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

// Function to connect to MongoDB
async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("✅ Connected to MongoDB");
        return client.db(process.env.MONGO_DB);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    }
}

// Route: Get User Profile
app.get("/get-profile", async (req, res) => {
    const db = await connectDB();
    if (!db) return res.status(500).send("Database connection failed");

    try {
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ userid: 1 });

        if (user) res.json(user);
        else res.status(404).send("User not found");
    } catch (error) {
        res.status(500).send("Error fetching user profile");
    }
});

// Route: Update User Profile
app.post("/update-profile", async (req, res) => {
    const db = await connectDB();
    if (!db) return res.status(500).send("Database connection failed");

    try {
        const usersCollection = db.collection("users");
        const updatedUser = await usersCollection.updateOne(
            { userid: req.body.userid },
            { $set: req.body },
            { upsert: true }
        );

        res.send("User profile updated successfully");
    } catch (error) {
        res.status(500).send("Error updating user profile");
    }
});

// Start Express Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to My Node.js App!");
});
