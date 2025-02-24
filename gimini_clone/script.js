function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;
    
    let chatBox = document.getElementById("chatBox");
    let userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("userInput").value = "";
    
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    })
    .then(response => response.json())
    .then(data => {
        let aiMessage = `<div><strong>Gmini AI:</strong> ${data.choices[0].message.content}</div>`;
        chatBox.innerHTML += aiMessage;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}
