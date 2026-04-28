const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ GET ALL TASKS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("user_id", req.user.id)
      .query(`
        SELECT 
          id AS id,
          title,
          description,
          completed
        FROM tasks
        WHERE user_id = @user_id
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ CREATE TASK
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
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

    res.status(201).json({ message: "Task created successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE TASK (FIXED 🔥)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const pool = await poolPromise;

    const existing = await pool.request()
      .input("id", id)
      .input("user_id", req.user.id)
      .query("SELECT * FROM tasks WHERE id = @id AND user_id = @user_id");

    if (existing.recordset.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const oldTask = existing.recordset[0];

    await pool.request()
      .input("id", id)
      .input("user_id", req.user.id)
      .input("title", title || oldTask.title)
      .input("description", description ?? oldTask.description ?? "")
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


// ✅ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const pool = await poolPromise;

    await pool.request()
      .input("id", id)
      .input("user_id", req.user.id)
      .query(`
        DELETE FROM tasks 
        WHERE id = @id AND user_id = @user_id
      `);

    res.json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;