function addButton() {
  const button = document.createElement("button");
  button.innerText = "Generate AI Response";
  button.style.position = "fixed";
  button.style.bottom = "10px";
  button.style.right = "10px";
  button.style.zIndex = 1000;
  button.style.padding = "10px";
  button.style.backgroundColor = "#4285F4";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";

  const spinner = document.createElement("div");
  spinner.style.position = "fixed";
  spinner.style.bottom = "50px";
  spinner.style.right = "10px";
  spinner.style.zIndex = 1000;
  spinner.style.width = "40px";
  spinner.style.height = "40px";
  spinner.style.border = "4px solid rgba(0, 0, 0, 0.1)";
  spinner.style.borderRadius = "50%";
  spinner.style.borderTopColor = "#4285F4";
  spinner.style.animation = "spin 1s linear infinite";
  spinner.style.display = "none";

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  button.addEventListener("click", () => {
    // Show the spinner
    spinner.style.display = "block";

    // Try to find the email body in the Gmail interface
    const emailBody = document.querySelector("div.ii.gt div.a3s.aiL");
    if (emailBody) {
      const emailText = emailBody.innerText;
      fetch("http://localhost:5000/process-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailText })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const aiResponse = data.response;
          // Find and click the reply button
          const replyButton = document.querySelector("div[aria-label='Reply'], div[aria-label='Reply all']");
          if (replyButton) {
            replyButton.click();
            // Wait for the reply window to open and insert the AI response
            setTimeout(() => {
              const replyBody = document.querySelector("div[aria-label='Message Body']");
              if (replyBody) {
                replyBody.innerText = aiResponse;
              } else {
                alert("Could not find the reply body.");
              }
              // Hide the spinner
              spinner.style.display = "none";
            }, 1000); // Adjust the timeout as needed
          } else {
            alert("Could not find the reply button.");
            // Hide the spinner
            spinner.style.display = "none";
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert(`An error occurred: ${error.message}`);
          // Hide the spinner
          spinner.style.display = "none";
        });
    } else {
      alert("Could not find the email content.");
      // Hide the spinner
      spinner.style.display = "none";
    }
  });

  document.body.appendChild(button);
  document.body.appendChild(spinner);
}

// Wait for the Gmail interface to load
window.addEventListener("load", () => {
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector("div[role='main']")) {
      addButton();
      obs.disconnect();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
});