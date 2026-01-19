const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const authMiddleware = require("../middleware/auth.middleware");
const { generateAIReview } = require("../services/aiReview.service");


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
    
    // --------------------------------------------

    // -------- AI REVIEW (Gemini, best-effort) --------
    const aiResponse = await generateAIReview({
      code,
      language,
      problem,
    });
    // -----------------------------------------------


    const submission = new Submission({
      user: req.user.userId,
      problem: problemId,
      language,
      code,
      reviewStatus: "reviewed",
      reviewResult: {
        aiStatus: aiResponse.success ? "success" : "failed",
        ai: aiResponse.success ? aiResponse.raw : null,
      },
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

// GET /submissions/my  (fetch logged-in user's submissions)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find({
      user: req.user.userId,
    })
      .populate("problem", "title difficulty patternTags")
      .sort({ createdAt: -1 });

    res.json({
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /submissions/problem/:problemId
router.get("/problem/:problemId", async (req, res) => {
  try {
    const { problemId } = req.params;

    const submissions = await Submission.find({
      problem: problemId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /submissions/metrics/progress
router.get("/metrics/progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const submissions = await Submission.find({ user: userId });

    const progressMap = {};

    submissions.forEach((submission) => {
      const date = submission.createdAt.toISOString().split("T")[0];

      if (!progressMap[date]) {
        progressMap[date] = 0;
      }
      progressMap[date]++;
    });

    const progressData = Object.keys(progressMap)
      .sort()
      .map((date) => ({
        date,
        count: progressMap[date],
      }));

    res.json(progressData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /submissions/metrics/difficulty
router.get("/metrics/difficulty", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const submissions = await Submission.find({ user: userId }).populate(
      "problem",
      "difficulty"
    );

    const difficultyCount = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    submissions.forEach((submission) => {
      const difficulty = submission.problem?.difficulty;
      if (difficulty && difficultyCount[difficulty] !== undefined) {
        difficultyCount[difficulty]++;
      }
    });

    res.json(difficultyCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /submissions/metrics/patterns
router.get("/metrics/patterns", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const submissions = await Submission.find({ user: userId }).populate(
      "problem",
      "patternTags"
    );

    const patternMap = {};

    submissions.forEach((submission) => {
      const patterns = submission.problem?.patternTags || [];
      patterns.forEach((pattern) => {
        if (!patternMap[pattern]) {
          patternMap[pattern] = 0;
        }
        patternMap[pattern]++;
      });
    });

    res.json(patternMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /submissions/metrics/attempts
router.get("/metrics/attempts", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const submissions = await Submission.find({ user: userId }).populate(
      "problem",
      "title"
    );

    const attemptMap = {};

    submissions.forEach((submission) => {
      const problemId = submission.problem._id.toString();

      if (!attemptMap[problemId]) {
        attemptMap[problemId] = {
          problemId,
          title: submission.problem.title,
          attempts: 0,
        };
      }

      attemptMap[problemId].attempts++;
    });

    const result = Object.values(attemptMap);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
