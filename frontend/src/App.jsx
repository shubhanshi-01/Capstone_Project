import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./app.css";
import botImage from "./assets/bot_icon.png";
import userImage from "./assets/user_icon.png";

function App() {
    const [messages, setMessages] = useState([
        { 
            text: "Welcome! Choose an option:", 
            sender: "bot", 
            type: "buttons", 
            options: ["Start", "Contact Us"] 
        }
    ]);
    const [emailText, setEmailText] = useState("");
    const [currentCondition, setCurrentCondition] = useState("welcome");

    const chatBoxRef = useRef(null);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const resetToWelcome = () => {
        addMessage({ 
            text: "Welcome! Choose an option:", 
            sender: "bot", 
            type: "buttons", 
            options: ["Start", "Contact Us"] 
        });
        setCurrentCondition("welcome");
    };

    const handleOptionClick = (option) => {
        addMessage({ text: option, sender: "user", type: "text" });

        if (option === "Start") {
            addMessage({ text: "Please enter your prompt.", sender: "bot", type: "text" });
            setCurrentCondition("enterResponse");
        } else if (option === "Contact Us") {
            setTimeout(() => {
                addMessage({ text: "You can contact us at support@example.com.", sender: "bot", type: "text" });
                setTimeout(resetToWelcome, 5000);
            }, 500);
        }
    };

    const handleSend = async () => {
        if (!emailText.trim()) return;
        addMessage({ text: emailText, sender: "user", type: "text" });

        if (currentCondition === "enterResponse") {
            try {
                const res = await axios.post("http://localhost:5000/process-email", { emailText });
                addMessage({ text: res.data.response, sender: "bot", type: "text" });
            } catch (error) {
                addMessage({ text: "Error: Unable to connect to backend.", sender: "bot", type: "text" });
            }
        } else {
            addMessage({ text: "Invalid User Response", sender: "bot", type: "text" });
        }
        setEmailText("");
        setTimeout(resetToWelcome, 5000);
    };

    return (
        <div>
            <div className="heading">Automated Email Response Generator</div>
            <div className="chat-box" ref={chatBoxRef} style={{ overflowY: "auto", maxHeight: "500px" }}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.sender}`}>
                        <img src={msg.sender === "bot" ? botImage : userImage} alt={`${msg.sender} avatar`} className="avatar" />
                        <div className={`message ${msg.sender}`}>
                            {msg.type === "buttons" ? (
                                <>
                                    <p>{msg.text}</p>
                                    {msg.options.map((option, idx) => (
                                        <button key={idx} className="option-button" onClick={() => handleOptionClick(option)}>
                                            {option}
                                        </button>
                                    ))}
                                </>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <textarea
                    className="textbox1"
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Enter your message..."
                />
                <button className="send-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default App;
