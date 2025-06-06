import { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import Sidewindow from "./Sidewindow";
import UseChat from "../Hooks/Usechat";
import { FiPlus, FiMessageSquare, FiUser } from "react-icons/fi";

const Chatwindow = () => {
  const [activeChat, setActiveChat] = useState("chat-1");
  const [chats, setChats] = useState([
    {
      id: "chat-1",
      title: "New Conversation",
      preview: "Start chatting...",
      date: new Date(),
      unread: false,
    },
  ]);

  const { messages, sendMessage, isTyping, clearMessages } =
    UseChat(activeChat);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setChats([
      ...chats,
      {
        id: newChatId,
        title: `Conversation ${chats.length + 1}`,
        preview: "New chat started",
        date: new Date(),
        unread: false,
      },
    ]);
    setActiveChat(newChatId);
    clearMessages();
  };

  const handleDeleteChat = (chatId) => {
    if (chats.length <= 1) return;
    const newChats = chats.filter((chat) => chat.id !== chatId);
    setChats(newChats);
    if (activeChat === chatId) {
      setActiveChat(newChats[newChats.length - 1].id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidewindow
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 border-b flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <FiMessageSquare className="text-blue-500" />
            <h2 className="font-semibold text-lg">
              {chats.find((c) => c.id === activeChat)?.title || "Chat"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiUser className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>Start a new conversation</p>
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isUser={msg.sender === "user"}
                />
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-4 max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <InputBox
          onSend={sendMessage}
          isTyping={isTyping}
          className="bg-white border-t p-4 shadow-sm"
        />
      </div>
    </div>
  );
};

export default Chatwindow;
