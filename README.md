# AI Email Response Generator

## Overview

This project is an AI-powered email response generator that analyzes the sentiment of an email and provides an appropriate response using OpenAI's GPT-4 via Azure OpenAI API. The system consists of a backend server built with Node.js and Express, a React-based frontend, and a browser extension popup for quick access.

## Features

-   AI-powered sentiment analysis and response generation
-   Rate limiting to prevent excessive requests
-   Exponential backoff for handling rate limit errors
-   User-friendly chatbot-style interface
-   Auto-scrolling chat experience
-   Browser extension popup for quick email input

## Tech Stack

-   **Backend:** Node.js, Express, Azure OpenAI API
-   **Frontend:** React.js, HTML, CSS, JavaScript

---

## Installation and Setup

### Prerequisites

-   Node.js (v16+ recommended)
-   npm or yarn
-   Azure OpenAI API Key

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ai-email-response.git
    cd ai-email-response/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add the following:
    ```env
    AZURE_OPENAI_API_KEY=your_api_key
    AZURE_OPENAI_ENDPOINT=your_endpoint
    PORT=5000
    ```
4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend:
    ```bash
    npm start
    ```

### Browser Extension Setup

1. Open `chrome://extensions/` in Google Chrome.
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked** and select the `extension` directory.
4. The extension will be added to your browser.

---

## Usage

-   Open the web app and paste an email.
-   Click the "Generate Response" button.
-   View the AI-generated response and copy it for use.
-   Alternatively, use the browser extension for quick email analysis.

---

## API Endpoints

### Analyze Email Sentiment & Generate Response

**Endpoint:** `POST /analyze`

**Request Body:**

```json
{
    "email": "Hello, I have a complaint about your service."
}
```

**Response:**

```json
{
    "sentiment": "negative",
    "response": "We're sorry for the inconvenience. How can we assist you further?"
}
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes and push to the branch.
4. Open a Pull Request.

---

## Contact

For any queries, feel free to reach out at -**Vaani Goyal** at **vanu.goyal@gmail.com**

-   **Vaishika Agrawal** at **agrawalvaishka5@gmail.com**.
-   **Shubhanshi** at **shubhanshibishnoi364@gmail.com**.
-   **Tanay Chajjed** at **tanay@gmail.com**.
