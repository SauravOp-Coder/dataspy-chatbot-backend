const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ GET route for root - so browser shows something when you visit /
app.get("/", (req, res) => {
  res.send("🤖 Dataspy Chatbot backend is running successfully.");
});

// ✅ POST /chat endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are Dataspy Assistant, a smart AI bot for Dataspy Technologies. Answer queries about business, tech, and services.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
  console.error("OpenAI API Error:", error.response?.data || error.message || error);
  res.status(500).json({ reply: "Sorry, I encountered an error. Please try again later." });
}
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

