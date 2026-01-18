const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin");

const {
  getAdminReviewLogs,
} = require("../../controllers/admin/review.controller");

// ADMIN: Get review logs (submissions)
router.get("/", authMiddleware, isAdmin, getAdminReviewLogs);

module.exports = router;
