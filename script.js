function startListening() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.onresult = function(event) {
    const userSpeech = event.results[0][0].transcript;
    document.getElementById("response").innerText = "Thinking...";
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userSpeech }]
      })
    })
    .then(res => res.json())
    .then(data => {
      const reply = data.choices[0].message.content;
      document.getElementById("response").innerText = reply;
      speak(reply);
    });
  };
  recognition.start();
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  speechSynthesis.speak(utterance);
}
