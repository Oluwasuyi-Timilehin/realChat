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
      // Configuration - use environment variables in production
      const HF_API_KEY =
        import.meta.env.VITE_DEEPSEEK_API_KEY ||
        "";

      const response = await fetch(
        `https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-V3`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HF_API_KEY}`,
          },
          body: JSON.stringify({
            inputs: userInput,
            parameters: {
              max_new_tokens: 200,
              temperature: 0.7,
            },
          }),
        }
      );

      // Handle response errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API request failed");
      }

      const data = await response.json();
      const botResponse =
        data.choices[0]?.message?.content || "No response generated";

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse.trim(),
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Error: ${error.message.replace(
            "Failed to fetch",
            "Connection error"
          )}`,
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
