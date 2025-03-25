// Backend (Express Server)
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// OpenAI API Configuration
const OPENAI_API_URL = process.env.API_URL;
const OPENAI_API_KEY = process.env.API_KEY;

// Function to generate email response
async function generateResponse(emailText) {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                messages: [
                    { role: "system", content: "You are an AI assistant for email responses." },
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
        console.error("Error generating response:", error);
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
