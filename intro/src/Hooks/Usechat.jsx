import { useState, useEffect } from "react";

const UseChat = (activeChat) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState({});

  // Load messages when active chat changes
  useEffect(() => {
    if (chatHistory[activeChat]) {
      setMessages(chatHistory[activeChat]);
    } else {
      setMessages([]);
    }
  }, [activeChat, chatHistory]);

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (userInput) => {
    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setChatHistory((prev) => ({
      ...prev,
      [activeChat]: newMessages,
    }));

    setIsTyping(true);

    try {
      const conversationHistory = [
        ...messages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: userInput },
      ];

      const response = await fetch(
        "https://api.deepinfra.com/v1/openai/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_DEEPINFRA_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-2-70b-chat-hf",
            messages: conversationHistory,
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response");
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      setChatHistory((prev) => ({
        ...prev,
        [activeChat]: updatedMessages,
      }));
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      const errorMessages = [...newMessages, errorMessage];
      setMessages(errorMessages);
      setChatHistory((prev) => ({
        ...prev,
        [activeChat]: errorMessages,
      }));
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping, clearMessages };
};

export default UseChat;
