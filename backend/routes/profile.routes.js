// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth.middleware");

// // GET /profile
// router.get("/", authMiddleware, (req, res) => {
//   res.json({
//     message: "Access granted to protected route",
//     user: req.user,
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User");

// GET /profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    const user = await User.findById(userId).select(
      "name email role"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
});

module.exports = router;
