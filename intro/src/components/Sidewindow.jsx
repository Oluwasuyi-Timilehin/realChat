

const Sidewindow = ({ chats, onSelectChat }) => {
  return (
    <>
      <div className="w-64 bg-gray-100 border-r border-gray-200 h-screen overflow-y-auto">
        <div className="p-4 bg-blue-600 text-white">
          <h2 className="font-bold">Chat History</h2>
        </div>
        <div className="space-y-1 p-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className="w-full text-left p-3 hover:bg-gray-200 rounded-lg transition"
            >
              <p className="truncate">{chat.preview || "New Chat"}</p>
              <p className="text-xs text-gray-500">{chat.date}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidewindow;
