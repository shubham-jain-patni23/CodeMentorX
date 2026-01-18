const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
const testRoutes = require("./routes/test.routes");
app.use("/test", testRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const problemRoutes = require("./routes/problem.routes");
app.use("/problems", problemRoutes);

const submissionRoutes = require("./routes/submission.routes");
app.use("/submissions", submissionRoutes);

const interviewRoutes = require("./routes/interview.routes");
app.use("/interview", interviewRoutes);

const adminProblemRoutes = require("./routes/admin/problem.routes");
app.use("/admin/problems", adminProblemRoutes);



module.exports = app;

