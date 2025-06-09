import { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import Sidewindow from "./Sidewindow";
import UseChat from "../Hooks/Usechat";
import { FiUser, FiChevronLeft } from "react-icons/fi";
import { LuBot } from "react-icons/lu";
import UseTheme from "../Hooks/useTheme";
import UseMediaQuery from "../Hooks/useMediaQuery";

const Chatwindow = () => {
  const [activeChat, setActiveChat] = useState("chat-1");
  const [chats, setChats] = useState([
    {
      id: "chat-1",
      title: "New Chat",
      preview: "Start chatting...",
      date: new Date(),
      unread: false,
    },
  ]);

  const isMobile = UseMediaQuery("(max-width: 1024px)");
  const [mobileView, setMobileView] = useState("sidebar");
  const { theme, toggleTheme } = UseTheme();

  const { messages, sendMessage, isTyping, clearMessages } =
    UseChat(activeChat);

  useEffect(() => {
    setMobileView(isMobile ? "sidebar" : "both");
  }, [isMobile]);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setChats([
      ...chats,
      {
        id: newChatId,
        title: `Conversation ${chats.length + 1}`,
        preview: "New chat started",
        date: new Date(),
        unread: false,
      },
    ]);
    setActiveChat(newChatId);
    clearMessages();
    if (isMobile) setMobileView("chat");
  };

  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
    if (isMobile) setMobileView("chat");
  };

  const handleBackToSidebar = () => {
    setMobileView("sidebar");
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-zinc-900 text-zinc-100"
          : "bg-zinc-50 text-zinc-800"
      }`}
    >
      {/* Desktop Layout - Show both */}
      {!isMobile && (
        <>
          <Sidewindow
            chats={chats}
            activeChat={activeChat}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div
              className={`p-4 border-b flex justify-between items-center ${
                theme === "dark"
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-white border-zinc-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-md">
                  {chats.find((c) => c.id === activeChat)?.title || "Chat"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-400">
                  <FiUser className="text-lg" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              className={`flex-1 overflow-y-auto p-4 ${
                theme === "dark"
                  ? "bg-zinc-900"
                  : "bg-gradient-to-b from-zinc-50 to-zinc-100"
              }`}
            >
              {messages.length === 0 ? (
                <div
                  className={`text-center py-10 ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                  }`}
                >
                  <p>Start a new conversation</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isUser={msg.sender === "user"}
                    theme={theme}
                  />
                ))
              )}
              {isTyping && (
                <div
                  className={`flex items-start gap-2 mb-4 ${
                    theme === "dark" ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${
                      theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
                    } flex items-center justify-center`}
                  >
                    <LuBot className="text-emerald-500" />
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      theme === "dark" ? "bg-zinc-800" : "bg-white"
                    } shadow`}
                  >
                    <div className="flex space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-zinc-500" : "bg-zinc-400"
                        } animate-bounce`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-zinc-500" : "bg-zinc-400"
                        } animate-bounce delay-75`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-zinc-500" : "bg-zinc-400"
                        } animate-bounce delay-150`}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <InputBox
              onSend={sendMessage}
              isTyping={isTyping}
              theme={theme}
              className={`border-t p-4 shadow-sm ${
                theme === "dark"
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-white border-zinc-400"
              }`}
            />
          </div>
        </>
      )}

      {/* Mobile Layout - Full screen views */}
      {isMobile && (
        <div className="w-full h-full">
          {/* Sidebar View - Full screen */}
          {mobileView === "sidebar" && (
            <div className="absolute inset-0 z-10 bg-white dark:bg-zinc-800 overflow-y-auto">
              <Sidewindow
                chats={chats}
                activeChat={activeChat}
                onSelectChat={handleSelectChat}
                onNewChat={handleNewChat}
                theme={theme}
                toggleTheme={toggleTheme}
                isMobile={true}
              />
            </div>
          )}

          {/* Chat View - Full screen */}
          {mobileView === "chat" && (
            <div className="absolute inset-0 z-20 flex flex-col bg-white dark:bg-zinc-800">
              {/* Header with back button */}
              <div
                className={`p-4 border-b flex items-center ${
                  theme === "dark"
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-white border-zinc-400"
                }`}
              >
                <button
                  onClick={handleBackToSidebar}
                  className="mr-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  <FiChevronLeft className="text-lg" />
                </button>
                <h2 className="font-semibold text-md flex-1 text-center">
                  {chats.find((c) => c.id === activeChat)?.title || "Chat"}
                </h2>
                <div className="w-8"></div>
              </div>

              {/* Messages Area */}
              <div
                className={`flex-1 overflow-y-auto p-4 ${
                  theme === "dark" ? "bg-zinc-900" : "bg-white"
                }`}
              >
                {messages.length === 0 ? (
                  <div
                    className={`text-center py-10 ${
                      theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    <p>Start a new conversation</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isUser={msg.sender === "user"}
                      theme={theme}
                    />
                  ))
                )}
                {isTyping && (
                  <div
                    className={`flex items-start gap-2 mb-4 ${
                      theme === "dark" ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${
                        theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
                      } flex items-center justify-center`}
                    >
                      <LuBot className="text-emerald-500" />
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        theme === "dark" ? "bg-zinc-800" : "bg-white"
                      } shadow`}
                    >
                      <div className="flex space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            theme === "dark" ? "bg-zinc-500" : "bg-zinc-400"
                          } animate-bounce`}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            theme === "dark" ? "bg-zinc-500" : "bg-zinc-400"
                          } animate-bounce delay-75`}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            theme === "dark" ? "bg-zinc-500" : "bg-zinc-400"
                          } animate-bounce delay-150`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <InputBox
                onSend={sendMessage}
                isTyping={isTyping}
                theme={theme}
                className={`border-t p-4 shadow-sm ${
                  theme === "dark"
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-white border-zinc-400"
                }`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatwindow;
