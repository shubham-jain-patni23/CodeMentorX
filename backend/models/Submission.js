const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
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

    language: {
      type: String,
      enum: ["cpp", "python", "javascript"],
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    reviewStatus: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending",
    },

    reviewResult: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
