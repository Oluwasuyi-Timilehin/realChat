import { useState, useEffect } from "react";

const Usechat = (chatId) => {
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
      // Replace with your actual OpenAI API key
      const OPENAI_KEY = "sk-your-openai-key-here"; // TEMPORARY - use environment variables in production

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        text: data.choices[0].message.content,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, I couldn't process your request.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  return { messages, sendMessage, isTyping };
};

export default Usechat;
