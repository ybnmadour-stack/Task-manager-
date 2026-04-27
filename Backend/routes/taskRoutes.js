const express = require("express");
const { poolPromise } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("user_id", req.user.id)
      .query("SELECT * FROM tasks WHERE user_id = @user_id ORDER BY id DESC");

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("id", req.params.id)
      .input("user_id", req.user.id)
      .query("SELECT * FROM tasks WHERE id = @id AND user_id = @user_id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const pool = await poolPromise;

    await pool.request()
      .input("title", title)
      .input("description", description || "")
      .input("user_id", req.user.id)
      .query(`
        INSERT INTO tasks (title, description, completed, user_id)
        VALUES (@title, @description, 0, @user_id)
      `);

    res.status(201).json({ message: "Task added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const pool = await poolPromise;

    await pool.request()
      .input("id", req.params.id)
      .input("user_id", req.user.id)
      .input("title", title)
      .input("description", description || "")
      .input("completed", completed ? 1 : 0)
      .query(`
        UPDATE tasks
        SET title = @title,
            description = @description,
            completed = @completed
        WHERE id = @id AND user_id = @user_id
      `);

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const pool = await poolPromise;

    await pool.request()
      .input("id", req.params.id)
      .input("user_id", req.user.id)
      .query("DELETE FROM tasks WHERE id = @id AND user_id = @user_id");

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;