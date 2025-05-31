import React from "react";

const MessageBubble = ({ text, sender }) => {

    const isUser = sender === "user";

  return (
    <>
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="break-words">{text}</p>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
