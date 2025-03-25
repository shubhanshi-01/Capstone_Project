document.getElementById("sendButton").addEventListener("click", async () => {
    const emailText = document.getElementById("emailText").value;
    if (!emailText) {
      alert("Please enter email text.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/process-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailText })
      });
      const data = await response.json();
      document.getElementById("response").innerText = data.response;
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("response").innerText = "An error occurred.";
    }
  });