import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

async function getBotResponse(input) {
  try {
    const response = await Chatbot.getResponse(input);
    return response || "Sorry, I cannot respond right now.";
  } catch {
    return `You said: "${input}"`;
  }
}

export function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState("");

  const saveInputText = (e) => setInputText(e.target.value);

  const sendMessage = async () => {
    if (!inputText) return;

    const userMessage = {
      message: inputText,
      sender: "user",
      id: crypto.randomUUID(),
    };

    const botResponse = await getBotResponse(inputText);

    const botMessage = {
      message: botResponse,
      sender: "robot",
      id: crypto.randomUUID(),
    };

    setChatMessages((prev) => [...prev, userMessage, botMessage]);
    setInputText("");
  };

  return (
    <div className='chat-input'>
      <input
        placeholder='Send a message to Chatbot'
        size={30}
        value={inputText}
        onChange={saveInputText}
        className='input-button'
      />
      <button onClick={sendMessage} className='send-button'>
        Send
      </button>
    </div>
  );
}
