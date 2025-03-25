// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [emailText, setEmailText] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSend = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/analyze", {
//         email: emailText,
//       });
//       setResponse(res.data.response);
//     } catch (error) {
//       setResponse("Error: Unable to connect to backend.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Email Response AI</h2>
//       <textarea
//         rows="6"
//         cols="50"
//         value={emailText}
//         onChange={(e) => setEmailText(e.target.value)}
//         placeholder="Paste your email here..."
//       />
//       <br />
//       <button onClick={handleSend}>Generate Response</button>
//       <h3>AI Response:</h3>
//       <p>{response}</p>
//     </div>
//   );
// }

// export default App;





// Frontend (React Component)
import { useState } from "react";
import axios from "axios";

function App() {
    const [emailText, setEmailText] = useState("");
    const [response, setResponse] = useState("");

    const handleSend = async () => {
        try {
            const res = await axios.post("http://localhost:5000/process-email", {
                emailText,
            });
            setResponse(res.data.response);
        } catch (error) {
            setResponse("Error: Unable to connect to backend.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Email Response AI</h2>
            <textarea
                rows="6"
                cols="50"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Paste your email here..."
            />
            <br />
            <button onClick={handleSend}>Generate Response</button>
            <h3>AI Response:</h3>
            <p>{response}</p>
        </div>
    );
}

export default App;
