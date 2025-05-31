import { useState } from "react";

const Chatwindow = () => {

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  ]);

  const handleSendMessage = (newMessage) => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: newMessage, sender: "user" };
    setMessages([...messages, userMessage]);

    // Simulate bot reply after 1s
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: `I received: "${newMessage}". This is a mock reply!`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };


  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-xl font-bold">ChatBot</h1>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              text={message.text}
              sender={message.sender}
            />
          ))}
        </div>

        {/* Input Box */}
        <InputBox onSendMessage={handleSendMessage} />
      </div>
    
    </>
  );
};

export default Chatwindow;
