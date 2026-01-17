const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const authMiddleware = require("../middleware/auth.middleware");

// POST /submissions  (submit code for a problem)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !language || !code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // -------- MOCK REVIEW LOGIC (Phase-1) --------
    const mockReview = {
      timeComplexity: problem.difficulty === "Easy" ? "O(n)" : "O(n log n)",
      spaceComplexity: "O(1)",
      suggestions: [
        "Try to reduce unnecessary loops.",
        "Think about optimal data structures.",
      ],
      patternHint:
        problem.patternTags && problem.patternTags.length > 0
          ? problem.patternTags[0]
          : "General",
    };
    // --------------------------------------------

    const submission = new Submission({
      user: req.user.userId,
      problem: problemId,
      language,
      code,
      reviewStatus: "reviewed",
      reviewResult: mockReview,
    });

    await submission.save();

    res.status(201).json({
      message: "Code submitted and reviewed successfully",
      submission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
