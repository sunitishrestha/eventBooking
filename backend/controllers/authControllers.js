import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const register = async (req, res) => {
  const { full_name, email, phone_number, password, role } = req.body;

  try {
    console.log("📝 Registration attempt for:", email);

    const checkUser = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (checkUser.rows.length > 0) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed successfully");

    const query = `
      INSERT INTO users(full_name, email, phone_number, password, role)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING id,full_name, email, phone_number, role`;

    const values = [full_name, email, phone_number, hashedPassword, role];

    const result = await pool.query(query, values);
    console.log("✅ User registered successfully:", result.rows[0]);

    res.json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Detailed Error:", err);
    res.status(500).json({ error: err.detail || err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔑 Login attempt for:", email);

  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];
    console.log("👤 User found:", user.email, "Role:", user.role);

    // Compare password
    console.log("🔐 Comparing passwords...");
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful for:", email);

    // Don't send password to frontend
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed: " + err.message });
  }
};
