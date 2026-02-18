import RobotProfileImage from "../assets/image.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat_message_user" : "chat_message_robot"}
    >
      {sender === "robot" && (
        <img
          src={RobotProfileImage}
          className='chat_message_profile'
          alt='robot'
        />
      )}
      <div className='chat_message_text'>{message}</div>
      {sender === "user" && (
        <img
          src={UserProfileImage}
          className='chat_message_profile'
          alt='user'
        />
      )}
    </div>
  );
}
