const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Allow Roblox to fetch data
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Endpoint: /gamepasses/:userId
app.get("/gamepasses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await fetch(
      `https://games.roblox.com/v1/users/${userId}/game-passes?limit=100`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gamepasses" });
  }
});

// Run server
app.listen(3000, () => {
  console.log("Proxy running on port 3000");
});
