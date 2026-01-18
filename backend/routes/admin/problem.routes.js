const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin");

const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} = require("../../controllers/admin/problem.controller");


// ADMIN: Add a new problem
router.post("/", authMiddleware, isAdmin, createProblem);

// ADMIN: Get all problems
router.get("/", authMiddleware, isAdmin, getAllProblems);

// ADMIN: Get single problem
router.get("/:id", authMiddleware, isAdmin, getProblemById);

// ADMIN: Update problem
router.put("/:id", authMiddleware, isAdmin, updateProblem);

// ADMIN: Delete problem
router.delete("/:id", authMiddleware, isAdmin, deleteProblem);

module.exports = router;
