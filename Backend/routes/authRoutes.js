const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { poolPromise } = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const finalName = username || name;

    if (!finalName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pool = await poolPromise;

    const existingUser = await pool.request()
      .input("email", email)
      .query("SELECT * FROM users WHERE email = @email");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input("username", finalName)
      .input("email", email)
      .input("password", hashedPassword)
      .query(`
        INSERT INTO users (username, email, password)
        VALUES (@username, @email, @password)
      `);

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;

    const result = await pool.request()
      .input("email", email)
      .query("SELECT * FROM users WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;