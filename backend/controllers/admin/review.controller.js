const Submission = require("../../models/Submission");

/**
 * @desc   Get admin review logs (recent submissions)
 * @route  GET /admin/reviews
 * @access Admin
 */
const getAdminReviewLogs = async (req, res) => {
  try {
    const reviews = await Submission.find(
      {},
      { reviewResult: 0, code: 0 }
    )
      .populate("user", "email")
      .populate("problem", "title")
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Admin review logs error:", error);
    return res.status(500).json({
      message: "Server error while fetching review logs",
    });
  }
};

module.exports = {
  getAdminReviewLogs,
};
