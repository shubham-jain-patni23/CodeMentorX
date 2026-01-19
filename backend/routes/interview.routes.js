const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const InterviewResponse = require("../models/InterviewResponse");
const Submission = require("../models/Submission");
const {
  generateInterviewEvaluation,
} = require("../services/aiReview.service");

// 🔧 Helper to safely parse AI JSON responses
function extractJSONFromAI(text) {
  if (!text) return null;

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI JSON:", cleaned);
    return null;
  }
}


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
    // 🤖 AI INTERVIEW EVALUATION
    const aiResult = await generateInterviewEvaluation({
      code: submission.code,
      language: submission.language,
      problem: await submission.populate("problem").then(s => s.problem),
      interviewAnswers: {
        approachExplanation,
        timeComplexity,
        spaceComplexity,
        optimizationIdeas,
        edgeCases,
      },
    });

    // 🧠 Safe defaults
    let interviewFeedback = {};
    let evaluationScore = 0;
    let flags = [];

    if (aiResult.success) {
      const parsed = extractJSONFromAI(aiResult.raw);

      if (parsed) {
        interviewFeedback = parsed;
        evaluationScore = parsed.score || 0;
        flags = parsed.flags || [];
      }
    }


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
      evaluationScore,
      flags,
    });


    await interviewResponse.save();

    submission.reviewResult = {
      ...submission.reviewResult,
      interviewFeedback,
    };

    await submission.save();


    res.status(201).json({
      message: "Interview evaluated successfully",
      evaluationScore,
      interviewFeedback,
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
