const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin");

const {
  getAdminStats,
} = require("../../controllers/admin/stats.controller");

// ADMIN: Get dashboard statistics
router.get("/", authMiddleware, isAdmin, getAdminStats);

module.exports = router;
