import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiMic } from "react-icons/fi";

const InputBox = ({ onSend, isTyping, className = "", theme }) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (!input.trim() || isTyping) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [input]);

  return (
    <div
      className={`px-2 py-3 flex flex-col gap-2 relative ${
        theme === "dark" ? "bg-zinc-800" : "bg-white"
      } ${className}`}
    >
      {isTyping && (
        <div
          className={`text-xs mb-2 px-2 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Assistant is typing...
        </div>
      )}
      <div className="flex items-center justify-center gap-2">
        <button
          className={`p-2 cursor-pointer rounded-full ${
            theme === "dark"
              ? "text-zinc-300 hover:bg-zinc-700"
              : "text-zinc-500 hover:bg-zinc-100"
          }`}
        >
          <FiPaperclip />
        </button>
        <div className="flex-1 relative">
          <input
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="Type a message..."
            className={`w-full p-2 border rounded-md focus:outline-none focus:border-emerald-500 transition-all ${
              theme === "dark"
                ? "bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                : "border-zinc-400 text-zinc-700"
            }`}
            rows={1}
            disabled={isTyping}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isTyping}
          className={`p-2 rounded-full ${
            input.trim()
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : theme === "dark"
              ? "text-zinc-600"
              : "text-zinc-400"
          } transition`}
        >
          <FiSend />
        </button>
        <button
          className={`p-2 cursor-pointer rounded-full ${
            theme === "dark"
              ? "text-zinc-300 hover:bg-zinc-700"
              : "text-zinc-500 hover:bg-zinc-100"
          }`}
        >
          <FiMic />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
