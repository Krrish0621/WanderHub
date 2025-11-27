const toggleBtn = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("chatbot-close");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");
const messagesBox = document.getElementById("chatbot-messages");

toggleBtn.onclick = () => {
  chatbot.style.display = "flex";
};

closeBtn.onclick = () => {
  chatbot.style.display = "none";
};

sendBtn.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;

  addMessage("user", msg);
  input.value = "";

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.innerText = "WanderBot is typing...";
  messagesBox.appendChild(typing);
  scrollToBottom();

  try {
    const res = await fetch("/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    typing.remove();
    addMessage("bot", data.reply);

  } catch (err) {
    typing.remove();
    addMessage("bot", "⚠️ Server error. Try again later.");
  }
}

function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-msg" : "bot-msg";
  div.innerText = text;
  messagesBox.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  messagesBox.scrollTop = messagesBox.scrollHeight;
}
