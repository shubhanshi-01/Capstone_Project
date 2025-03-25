const axios = require("axios");

const API_URL =
    "https://ai-aihackthonhub282549186415.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2025-01-01-preview";
const API_KEY = "Fj1KPt7grC6bAkNja7daZUstpP8wZTXsV6Zjr2FOxkO7wsBQ5SzQJQQJ99BCACHYHv6XJ3w3AAAAACOGL3Xg"; // Replace with your real API key

async function getGPT4Response(userMessage) {
    try {
        const response = await axios.post(
            API_URL,
            {
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("GPT-4 Response:", response.data.choices[0].message.content);
    } catch (error) {
        console.error("Error calling GPT-4 API:", error.response ? error.response.data : error.message);
    }
}

// Example usage
getGPT4Response("Hello, how are you?");
