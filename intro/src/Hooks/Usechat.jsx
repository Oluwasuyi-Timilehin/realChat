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

    // Update messages immediately (optimistic update)
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Update chat history
    setChatHistory((prev) => ({
      ...prev,
      [activeChat]: newMessages,
    }));

    setIsTyping(true);

    try {
      // In a real app, you would call your API here
      // This is a mock response for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const botResponse = `This is a simulated response to: "${userInput}"`;

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
