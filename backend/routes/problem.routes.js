const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const authMiddleware = require("../middleware/auth.middleware");

// POST /problems  (add a new problem)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      constraints,
      difficulty,
      patternTags,
      thinkPrompts,
    } = req.body;

    if (
      !title ||
      !description ||
      !constraints ||
      !difficulty ||
      !patternTags ||
      !thinkPrompts
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const problem = new Problem({
      title,
      description,
      constraints,
      difficulty,
      patternTags,
      thinkPrompts,
      createdBy: req.user.userId,
    });

    await problem.save();

    res.status(201).json({
      message: "Problem added successfully",
      problem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /problems  (fetch all problems)
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });

    res.json({
      count: problems.length,
      problems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
