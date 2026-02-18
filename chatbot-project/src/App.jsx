import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: "Hello! I am your chatbot.", sender: "robot", id: "id0" },
  ]);

  return (
    <div className='app_container'>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput setChatMessages={setChatMessages} />
    </div>
  );
}

export default App;
