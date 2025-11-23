// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Set up PostgreSQL pool connection using connection string from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Simple test route
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

// Example route to query database
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users"); // adjust table name
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
