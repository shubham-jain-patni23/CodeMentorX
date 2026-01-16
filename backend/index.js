const express = require("express");

const app = express();

// 🔹 NEW LINE (middleware)
app.use(express.json());

// simple test route
app.get("/", (req, res) => {
  res.send("CodeMentorX backend is running 🚀");
});

app.post("/test", (req, res) => {
  const data = req.body;

  res.json({
    message: "Data received successfully",
    receivedData: data,
  });
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
