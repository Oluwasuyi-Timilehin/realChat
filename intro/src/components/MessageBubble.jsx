const MessageBubble = ({ text, sender, timestamp }) => {
  const isUser = sender === "user";

  const displayText = typeof text === "string" ? text : JSON.stringify(text);

  return (
    <>
      <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-xs md:max-w-md rounded-lg p-4 relative ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          <p className="mb-1 whitespace-pre-wrap">{displayText}</p>
          <p
            className={`text-xs ${isUser ? "text-blue-200" : "text-gray-500"}`}
          >
            {new Date(timestamp).toLocaleTimeString()}
          </p>
          {/* Triangle tip */}
          <div
            className={`absolute top-0 w-3 h-3 ${
              isUser
                ? "right-0 -mr-1 bg-blue-600 rotate-45"
                : "left-0 -ml-1 bg-white border-l border-t border-gray-200 -rotate-45"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
