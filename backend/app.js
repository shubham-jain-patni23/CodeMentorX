const express = require("express");

const app = express();

// middleware
app.use(express.json());

// routes
const testRoutes = require("./routes/test.routes");
app.use("/test", testRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);


module.exports = app;

