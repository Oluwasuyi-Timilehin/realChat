import { useState } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import Sidewindow from "./Sidewindow";
import Usechat from "../Hooks/Usechat";

const Chatwindow = () => {
  const [activeChat, setActiveChat] = useState("chat-1");
  const [chats, setChats] = useState([
    { id: "chat-1", preview: "Hello!", date: new Date().toLocaleString() },
  ]);

  const { messages, sendMessage } = Usechat(activeChat);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setChats([
      ...chats,
      { id: newChatId, preview: "New Chat", date: new Date().toLocaleString() },
    ]);
    setActiveChat(newChatId);
  };

  return (
    <>
      <div className="flex h-screen bg-white">
        <Sidewindow chats={chats} onSelectChat={setActiveChat} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-gray-700">
              Chat #{activeChat.split("-")[1]}
            </h2>
            <button
              onClick={handleNewChat}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              New Chat +
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                text={msg.text}
                sender={msg.sender}
                timestamp={msg.timestamp}
              />
            ))}
          </div>

          {/* Input */}
          <InputBox onSend={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default Chatwindow;
