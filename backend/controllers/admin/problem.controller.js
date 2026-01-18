const Problem = require("../../models/Problem");

/**
 * @desc   Admin creates a new problem
 * @route  POST /admin/problems
 * @access Admin
 */
const createProblem = async (req, res) => {
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
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const problem = new Problem({
      title,
      description,
      constraints,
      difficulty,
      patternTags,
      thinkPrompts,
      createdBy: req.user.userId || req.user.id,
    });

    await problem.save();

    return res.status(201).json({
      message: "Problem added successfully",
      problem,
    });
  } catch (error) {
    console.error("Create problem error:", error);
    return res.status(500).json({
      message: "Server error while creating problem",
    });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });

    return res.json({
      count: problems.length,
      problems,
    });
  } catch (error) {
    console.error("Fetch problems error:", error);
    return res.status(500).json({
      message: "Server error while fetching problems",
    });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    return res.json(problem);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid problem ID",
    });
  }
};

const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No fields provided to update",
      });
    }


    const {
      title,
      description,
      constraints,
      difficulty,
      patternTags,
      thinkPrompts,
    } = req.body || {};


    if (title !== undefined) problem.title = title;
    if (description !== undefined) problem.description = description;
    if (constraints !== undefined) problem.constraints = constraints;
    if (difficulty !== undefined) problem.difficulty = difficulty;
    if (patternTags !== undefined) problem.patternTags = patternTags;
    if (thinkPrompts !== undefined) problem.thinkPrompts = thinkPrompts;

    const updatedProblem = await problem.save();

    return res.json({
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("Update problem error:", error);
    return res.status(500).json({
      message: "Server error while updating problem",
    });
  }
};


const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    await problem.deleteOne();

    return res.json({
      message: "Problem deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting problem",
    });
  }
};

module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};

