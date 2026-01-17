const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const InterviewResponse = require("../models/InterviewResponse");
const Submission = require("../models/Submission");

// POST /interview/submit
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const {
      submissionId,
      approachExplanation,
      timeComplexity,
      spaceComplexity,
      optimizationIdeas,
      edgeCases,
    } = req.body;

    if (!submissionId || !approachExplanation || !timeComplexity || !spaceComplexity) {
      return res.status(400).json({
        message: "Required interview fields are missing",
      });
    }

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // ownership check
    if (submission.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // -------- RULE-BASED EVALUATION (Phase-1) --------
    let score = 0;
    const flags = [];

    if (approachExplanation.length > 30) score += 25;
    else flags.push("Approach explanation is too brief");

    if (timeComplexity.toLowerCase().includes("o(")) score += 20;
    else flags.push("Time complexity not clearly stated");

    if (spaceComplexity.toLowerCase().includes("o(")) score += 20;
    else flags.push("Space complexity not clearly stated");

    if (optimizationIdeas && optimizationIdeas.length > 20) score += 20;
    else flags.push("Optimization ideas missing or weak");

    if (edgeCases && edgeCases.length > 10) score += 15;
    else flags.push("Edge cases not discussed");
    // ------------------------------------------------

    const interviewResponse = new InterviewResponse({
      submission: submission._id,
      user: req.user.userId,
      problem: submission.problem,
      approachExplanation,
      timeComplexity,
      spaceComplexity,
      optimizationIdeas,
      edgeCases,
      evaluationScore: score,
      flags,
    });

    await interviewResponse.save();

    res.status(201).json({
      message: "Interview response submitted",
      evaluationScore: score,
      flags,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /interview/:submissionId  (fetch interview feedback)
router.get("/:submissionId", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;

    const interviewResponse = await InterviewResponse.findOne({
      submission: submissionId,
      user: req.user.userId,
    }).populate("problem", "title difficulty");

    if (!interviewResponse) {
      return res
        .status(404)
        .json({ message: "Interview feedback not found" });
    }

    res.json(interviewResponse);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid submission ID" });
  }
});


module.exports = router;
