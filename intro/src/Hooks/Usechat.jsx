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
      const HF_API_KEY = ""; // Replace with env var
      const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.1";

      // Make the inference request directly (status endpoint no longer available)
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${MODEL_ID}`,
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
              return_full_text: false,
              temperature: 0.7,
              top_p: 0.9,
            },
          }),
        }
      );

      // Handle special cases
      if (response.status === 503) {
        // Model is loading
        const retryAfter = response.headers.get("Retry-After") || 20;
        throw new Error(`Model is loading. Try again in ${retryAfter} seconds`);
      } else if (response.status === 404) {
        throw new Error("Model not found. Please check the model ID");
      } else if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "API request failed");
      }

      const data = await response.json();

      // Extract response text from different possible formats
      const botResponse =
        data[0]?.generated_text ||
        data.generated_text ||
        (Array.isArray(data) ? data[0]?.response : null) ||
        "I didn't understand that. Could you rephrase?";

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
