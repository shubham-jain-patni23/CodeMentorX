const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// GET /profile
router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

module.exports = router;
