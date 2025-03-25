import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./app.css";
import botImage from "./assets/images/images.png";
import userImage from "./assets/images/Group.png";

function App() {
    // const botImage = "D:\Capstone\Capstone_Project\frontend\IMG_20221026_182722_159.jpg"; 
    // const userImage = "D:\Capstone\Capstone_Project\frontend\IMG_20221026_182722_221.jpg";
    const [messages, setMessages] = useState([
        { text: "Welcome! Choose an option:", sender: "bot", type: "text" },
        { text: "Start", sender: "bot", type: "button", action: "Start" },
        { text: "Contact Us", sender: "bot", type: "button", action: "Contact Us" }
    ]);
    const [emailText, setEmailText] = useState("");
    const [currentCondition, setCurrentCondition] = useState("welcome");

    const chatBoxRef = useRef(null);

    const addMessage = (text, sender, type = "text", action = null) => {
        setMessages((prevMessages) => [...prevMessages, { text, sender, type, action }]);
    };

    useEffect(() => {
        // Scrolls smoothly to the last message
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const resetToWelcome = () => {
        addMessage("Welcome! Choose an option:", "bot");
        addMessage("Start", "bot", "button", "Start");
        addMessage("Contact Us", "bot", "button", "Contact Us");
        setCurrentCondition("welcome");
    };

    const handleOptionClick = (option) => {
        addMessage(option, "user");

        if (option === "Start") {
            addMessage("Please enter your prompt.", "bot");
            setCurrentCondition("enterResponse");
        } else if (option === "Contact Us") {
            setTimeout(() => {
                addMessage("You can contact us at support@example.com.", "bot");

                setTimeout(() => {
                    resetToWelcome();
                }, 5000);
            }, 500);
        }
    };

    const handleSend = async () => {
        if (!emailText.trim()) return;
        addMessage(emailText, "user");

        if (currentCondition === "enterResponse") {
            try {
                const res = await axios.post("http://localhost:5000/process-email", {
                    emailText,
                });
                addMessage(res.data.response, "bot");
            } catch (error) {
                addMessage("Error: Unable to connect to backend.", "bot");
            }
        } else {
            addMessage("Invalid User Response", "bot");
        }
        setEmailText("");

        setTimeout(() => {
            resetToWelcome();
        }, 5000);
    };

    return (
        <div>
            <div className="heading">
                Automated Email Response Generator
            </div>
            <div className="chat-box" ref={chatBoxRef} style={{ overflowY: "auto", maxHeight: "500px" }}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.sender}`}>
                        <img src={msg.sender === "bot" ? botImage : userImage} alt={`${msg.sender} avatar`} className="avatar" />
                        <div className={`message ${msg.sender}`}>
                        {msg.type === "button" ? (
                            <button className="option-button" onClick={() => handleOptionClick(msg.action)}>
                                {msg.text}
                            </button>
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