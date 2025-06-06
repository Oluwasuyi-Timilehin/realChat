import { FiUser } from "react-icons/fi";
import { LuBot } from "react-icons/lu";
import { format } from "date-fns";

const MessageBubble = ({ message, isUser, theme }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${
            theme === "dark" ? "bg-emerald-900" : "bg-emerald-100"
          } flex items-center justify-center mt-1`}
        >
          <LuBot className="text-emerald-500 dark:text-emerald-400" />
        </div>
      )}

      <div
        className={`max-w-[80%] md:max-w-[70%] flex flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl p-4 ${
            isUser
              ? "bg-emerald-500 text-white rounded-tr-none"
              : theme === "dark"
              ? "bg-zinc-700 text-zinc-100 rounded-tl-none"
              : "bg-white text-zinc-800 rounded-tl-none shadow-sm"
          }`}
        >
          <div className="whitespace-pre-wrap">
            {typeof message.text === "string" ? (
              message.text
            ) : (
              <pre className="text-xs">
                {JSON.stringify(message.text, null, 2)}
              </pre>
            )}
          </div>
        </div>
        <div
          className={`text-xs mt-1 ${
            theme === "dark" ? "text-zinc-500" : "text-zinc-400"
          } ${isUser ? "text-right" : "text-left"}`}
        >
          {format(new Date(message.timestamp), "h:mm a")}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mt-1">
          <FiUser className="text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
