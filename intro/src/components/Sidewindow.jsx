import { FiMessageSquare, FiTrash2, FiPlus, FiUser } from "react-icons/fi";
import { LuMoon } from "react-icons/lu";
import { format } from "date-fns";

const Sidewindow = ({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) => {
  return (
    <div className="w-72 bg-white border-r border-zinc-400 flex flex-col h-full">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-zinc-700 text-xl">Chats</p>
          <LuMoon className="cursor-pointer" />
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
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
            Recent Conversations
          </h3>
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`relative group rounded-lg ${
                  activeChat === chat.id
                    ? "bg-emerald-50"
                    : "hover:bg-emerald-50"
                }`}
              >
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full text-left p-3 pr-8 ${
                    activeChat === chat.id
                      ? "text-emerald-600"
                      : "text-emerald-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiMessageSquare className="flex-shrink-0" />
                    <div className="truncate">
                      <p className="truncate font-medium">{chat.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.preview}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs mt-1 text-gray-400">
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

      <div className="p-3 border-t border-zinc-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiUser className="text-emerald-500" />
          </div>
          <div>
            <p className="font-medium">User</p>
            <p className="text-xs text-zinc-500">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidewindow;
