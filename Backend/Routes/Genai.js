const express = require("express");
const GenaiRouter = express.Router();
const OpenAI = require("openai"); 

require("dotenv").config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_KEY,
  defaultHeaders: {
    // This uses your deployed URL if it exists, otherwise localhost
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:7777", 
    "X-Title": "FoodyFly",
  }
});

GenaiRouter.post("/ask-ai", async (req, res) => {
    try {
        const { userQuestion, allFeedData } = req.body;

        if (!userQuestion || !allFeedData) {
            return res.status(400).json({ success: false, message: "Missing Data" });
        }

        // 1. Prepare Context (Keep it concise for speed)
        const contextText = allFeedData.map((restro) => 
            `- ${restro.RestroName} (⭐${restro.rating}) - ${restro.keywords?.join(", ") || "Food"}`
        ).join("\n");

        // 2. The "Fast FoodyBot" Prompt
        const systemPrompt = `
You are FoodyBot 🤖, a food recommendation assistant.

RESTAURANTS:
${contextText}

RULES:
- Answer in ONLY 1 sentence.
- Mention restaurant name + dish.
- Max 18 words.
- Friendly tone with 2-3 emoji.

GOOD EXAMPLE:
"Try Paneer Tikka at Spice Villa 🔥"

BAD EXAMPLE:
"This restaurant is very popular and you should definitely try..."

Only return the answer sentence.
`;

       const completion = await client.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct",

        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuestion }
        ],

        max_tokens: 80,
        temperature: 0.7
        });

        const answer = completion.choices[0].message.content;
        return res.status(200).json({ success: true, answer: answer });

    } catch (err) {
        console.error("🔥 OpenRouter Error:", err.message);
        return res.status(500).json({ success: false, message: "AI Error: " + err.message });
    }
});

module.exports = GenaiRouter;