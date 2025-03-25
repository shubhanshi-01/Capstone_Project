require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Azure OpenAI API Configuration
const OPENAI_API_URL =
    "https://ai-aihackthonhub282549186415.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2025-01-01-preview";
const OPENAI_API_KEY = process.env.API_KEY;

// Rate Limiting: Allow max 5 requests per minute
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per window
    message: { error: "Too many requests. Please try again later." },
});
app.use("/process-email", limiter); // Apply rate limiting to this route

// Simple Cache to store responses
const cache = new Map();
async function analyzeSentimentAndIntent(emailText, retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(
                OPENAI_API_URL,
                {
                    messages: [
                        { role: "system", content: "You are an AI assistant for sentiment and intent analysis." },
                        { role: "user", content: emailText },
                    ],
                    model: "gpt-4-turbo-2024-04-09",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": OPENAI_API_KEY,
                    },
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            if (error.response?.status === 429) {
                const retryAfter = error.response.headers["retry-after"] || delay;
                console.warn(`Rate limit hit. Retrying in ${retryAfter / 1000} seconds...`);
                await new Promise((res) => setTimeout(res, retryAfter));
                delay *= 2; // Exponential backoff
            } else {
                console.error("Error analyzing sentiment:", error.response?.data || error.message);
                return null;
            }
        }
    }
    return null;
}

// Function to generate email response with caching and retries
async function generateResponse(emailText) {
    if (cache.has(emailText)) {
        return cache.get(emailText); // Return cached response
    }

    const analysis = await analyzeSentimentAndIntent(emailText);
    if (!analysis) return "Sorry, an error occurred while analyzing the email.";

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                messages: [
                    {
                        role: "system",
                        content: `You are an AI assistant for email responses. The sentiment and intent analysis of the email is: ${analysis}`,
                    },
                    { role: "user", content: emailText },
                ],
                model: "gpt-4-turbo-2024-04-09",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": OPENAI_API_KEY,
                },
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        cache.set(emailText, aiResponse); // Store response in cache
        return aiResponse;
    } catch (error) {
        console.error("Error generating response:", error.response?.data || error.message);
        return "Sorry, an error occurred while processing the email.";
    }
}

// API endpoint to process emails
app.post("/process-email", async (req, res) => {
    const { emailText } = req.body;
    if (!emailText) {
        return res.status(400).json({ error: "Email text is required" });
    }

    const aiResponse = await generateResponse(emailText);
    res.json({ response: aiResponse });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
