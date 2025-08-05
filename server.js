const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Dataspy Assistant, a smart AI bot for Dataspy Technologies. Answer queries about business, tech, and services." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ reply: "Sorry, I encountered an error. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
