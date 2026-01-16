const express = require("express");
const router = express.Router();

// POST /test
router.post("/", (req, res) => {
  const data = req.body;

  res.json({
    message: "Data received successfully",
    receivedData: data,
  });
});

module.exports = router;
