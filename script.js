document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "<span class='text-green'>Thinking...</span>";
  
    if (!userInput.trim()) {
      responseBox.innerHTML = "<span class='text-danger'>Please enter a question!</span>";
      return;
    }
  
    try {
      const response = await fetch("https://api.wit.ai/message?v=20230101&q=" + encodeURIComponent(userInput), {
        headers: {
          Authorization: "Bearer UMWUNNDM5KVPSSYQI3SF2JROPJY6P4ZS" // Replace with your Wit.ai API token
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch response from Wit.ai");
      }
  
      const data = await response.json();
      const botReply = data.entities && data.entities.intent
        ? `Intent: ${data.entities.intent[0].value}`
        : "Sorry, I couldn't understand that.";
  
      responseBox.innerHTML = `<span class="text-green">${botReply}</span>`;
    } catch (error) {
      responseBox.innerHTML = `<span class="text-danger">Error: ${error.message}</span>`;
    }
  });
  