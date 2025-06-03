import { useState } from "react";

const Usechat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userInput) => {
    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama2", // or "mistral", "gemma", etc.
          messages: [{ role: "user", content: userInput }],
          stream: false,
        }),
      });

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        text: data.message.content,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Error handling
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
};

export default Usechat;
