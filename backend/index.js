const express = require("express");

const app = express();

// simple test route
app.get("/", (req, res) => {
  res.send("CodeMentorX backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
