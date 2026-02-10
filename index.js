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
      `https://apis.roblox.com/game-passes/v1/users/${userId}/game-passes`
    );

    if (!response.ok) {
  return res.status(response.status).json({ error: "Roblox API error" });
}


    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch game passes" });
  }
});


// Run server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});

