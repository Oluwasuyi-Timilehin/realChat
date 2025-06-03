require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Configuration
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    console.log("Received request:", req.body); // Log incoming requests

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        ...req.body, // Forward the request body
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    console.log("API Response:", data); // Log successful responses
    res.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
});

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);