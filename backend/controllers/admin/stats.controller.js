const Problem = require("../../models/Problem");
const User = require("../../models/User");

// ⛔ Change this import name ONLY if your review model is named differently
const Submission = require("../../models/Submission");

/**
 * @desc   Get admin dashboard statistics
 * @route  GET /admin/stats
 * @access Admin
 */
const getAdminStats = async (req, res) => {
  try {
    const [totalProblems, totalUsers, totalReviews] = await Promise.all([
      Problem.countDocuments(),
      User.countDocuments(),
      Submission.countDocuments(),
    ]);

    return res.json({
      totalProblems,
      totalUsers,
      totalReviews,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({
      message: "Server error while fetching admin stats",
    });
  }
};

module.exports = {
  getAdminStats,
};
