import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  return (
    <div className='chat_message_container' ref={chatMessagesRef}>
      {chatMessages.map((msg) => (
        <ChatMessage key={msg.id} message={msg.message} sender={msg.sender} />
      ))}
    </div>
  );
}
export default ChatMessages;
