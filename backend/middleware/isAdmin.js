// const User = require("../models/User");

// const isAdmin = async (req, res, next) => {
//   try {
//     const userId = req.user.id; // set by auth middleware

//     const user = await User.findById(userId);

//     if (!user || user.role !== "admin") {
//       return res.status(403).json({
//         message: "Admin access required",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       message: "Admin authorization failed",
//     });
//   }
// };

// module.exports = isAdmin;
const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user.userId;

    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Admin authorization failed",
    });
  }
};

module.exports = isAdmin;
