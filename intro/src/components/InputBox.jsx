import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiMic } from "react-icons/fi";

const InputBox = ({ onSend, isTyping, className = "" }) => {
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
    <div className={`${className}`}>
      {isTyping && (
        <div className="text-xs text-gray-500 mb-2 px-2">
          Assistant is typing...
        </div>
      )}
      <div className="flex items-end gap-2">
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <FiPaperclip />
        </button>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="Type a message..."
            className="w-full min-h-[40px] max-h-[150px] p-3 pr-10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            rows={1}
            disabled={isTyping}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isTyping}
          className={`p-3 rounded-full ${
            input.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "text-gray-400 bg-gray-100"
          } transition`}
        >
          <FiSend />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <FiMic />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
