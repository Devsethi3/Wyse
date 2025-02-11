import React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";

interface ChatListProps {
  chats: Doc<"chats">[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatList = ({ chats, selectedChatId, onSelectChat }: ChatListProps) => {
  const createChat = useMutation(api.chats.create);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newChatName, setNewChatName] = React.useState("");

  const handleCreateChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatName.trim()) return;

    const chatId = await createChat({
      type: "group",
      name: newChatName,
    });
    setNewChatName("");
    setIsCreating(false);
    onSelectChat(chatId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <button
          onClick={() => setIsCreating(true)}
          className="lg:w-full w-[80%] bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-lg 
          hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          New Chat
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateChat} className="p-4 border-b dark:border-gray-700">
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="Chat name"
            className="w-full p-2 border dark:border-gray-700 rounded-lg mb-2 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 dark:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm 
              hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 
              py-1 px-3 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onSelectChat(chat._id)}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedChatId === chat._id ? "bg-blue-50" : ""
            }`}
          >
            <div className="font-medium">{chat.name || "Unnamed Chat"}</div>
            <div className="text-sm text-gray-500">
              {new Date(chat.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
