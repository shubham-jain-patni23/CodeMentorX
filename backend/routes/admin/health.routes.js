const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin");

const {
  getAdminHealth,
} = require("../../controllers/admin/health.controller");

// ADMIN: Health check
router.get("/", authMiddleware, isAdmin, getAdminHealth);

module.exports = router;
