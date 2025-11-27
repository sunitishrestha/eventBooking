// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import pkg from "pg";
// import bcrypt from "bcrypt";

// dotenv.config();
// const { Pool } = pkg;

// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Test DB
// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

// // Register API
// app.post("/register", async (req, res) => {
//   const { fullname, email, number, password, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = `INSERT INTO users(fullName,email,number,password,role)
//                    VALUES($1,$2,$3,$4,$5) RETURNING *`;

//     const values = [fullName, email, number, hashedPassword, role];

//     const result = await pool.query(query, values);

//     res.json({ message: "User registered successfully", user: result.rows[0] });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Registration failed" });
//   }
// });

// // Login API
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email=$1", [
//       email,
//     ]);

//     if (result.rows.length === 0)
//       return res.status(400).json({ error: "User not found" });

//     const user = result.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

//     res.json({ message: "Login successful", user });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// app.listen(process.env.PORT, () =>
//   console.log("Server running on port " + process.env.PORT)
// );

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routes/authRouters.js";
import "./config/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use("/api/auth", authRouters);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
