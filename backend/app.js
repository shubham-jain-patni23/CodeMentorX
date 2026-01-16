const express = require("express");

const app = express();

// middleware
app.use(express.json());

// routes
const testRoutes = require("./routes/test.routes");
app.use("/test", testRoutes);

module.exports = app;
