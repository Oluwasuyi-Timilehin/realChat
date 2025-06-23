import { FiMessageSquare, FiTrash2, FiPlus, FiUser } from "react-icons/fi";
import { LuMoon, LuSun } from "react-icons/lu";
import { format } from "date-fns";

const Sidewindow = ({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  theme,
  toggleTheme,
}) => {
  return (
    <div
      className={`w-full h-full flex flex-col lg:w-72 ${
        theme === "dark"
          ? "bg-zinc-800 border-zinc-700"
          : "bg-white border-zinc-400"
      } border-r`}
    >
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p
            className={`font-semibold text-xl ${
              theme === "dark" ? "text-zinc-100" : "text-zinc-700"
            }`}
          >
            Chats
          </p>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-400"
          >
            {theme === "dark" ? (
              <LuSun className="text-yellow-300" />
            ) : (
              <LuMoon className="text-zinc-500" />
            )}
          </button>
        </div>
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition cursor-pointer"
        >
          <FiPlus /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3
            className={`text-xs font-semibold uppercase tracking-wider px-2 py-2 ${
              theme === "dark" ? "text-zinc-400" : "text-gray-500"
            }`}
          >
            Recent Conversations
          </h3>
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`relative group rounded-lg ${
                  activeChat === chat.id
                    ? theme === "dark"
                      ? "bg-zinc-700"
                      : "bg-emerald-50"
                    : theme === "dark"
                    ? "hover:bg-zinc-700"
                    : "hover:bg-emerald-50"
                }`}
              >
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full text-left p-3 pr-8 ${
                    activeChat === chat.id
                      ? "text-emerald-600 dark:text-emerald-400"
                      : theme === "dark"
                      ? "text-zinc-200"
                      : "text-emerald-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiMessageSquare className="flex-shrink-0" />
                    <div className="truncate">
                      <p className="truncate font-medium">{chat.title}</p>
                      <p
                        className={`text-xs truncate ${
                          theme === "dark" ? "text-zinc-400" : "text-gray-500"
                        }`}
                      >
                        {chat.preview}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-zinc-500" : "text-gray-400"
                    }`}
                  >
                    {format(new Date(chat.date), "MMM d, h:mm a")}
                  </p>
                </button>
                {chats.length > 1 && (
                  <button
                    onClick={() => onDeleteChat(chat.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-red-500 transition opacity-0 
                    group-hover:opacity-100"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`p-3 border-t ${
          theme === "dark" ? "border-zinc-700" : "border-zinc-400"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 cursor-pointer flex items-center justify-center">
            <FiUser className="text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <p
              className={`font-medium ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              User
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Free Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidewindow;
