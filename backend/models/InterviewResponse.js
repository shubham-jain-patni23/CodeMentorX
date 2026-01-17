const mongoose = require("mongoose");

const interviewResponseSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    approachExplanation: {
      type: String,
      required: true,
    },

    timeComplexity: {
      type: String,
      required: true,
    },

    spaceComplexity: {
      type: String,
      required: true,
    },

    optimizationIdeas: {
      type: String,
    },

    edgeCases: {
      type: String,
    },

    evaluationScore: {
      type: Number,
      default: 0,
    },

    flags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewResponse",
  interviewResponseSchema
);
