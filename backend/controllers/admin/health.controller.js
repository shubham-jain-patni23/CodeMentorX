const mongoose = require("mongoose");

/**
 * @desc   Admin health check
 * @route  GET /admin/health
 * @access Admin
 */
const getAdminHealth = async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;

    const dbStatus =
      dbState === 1
        ? "connected"
        : dbState === 2
        ? "connecting"
        : dbState === 0
        ? "disconnected"
        : "unknown";

    return res.json({
      status: "ok",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Admin health error:", error);
    return res.status(500).json({
      status: "error",
      message: "Health check failed",
    });
  }
};

module.exports = {
  getAdminHealth,
};
