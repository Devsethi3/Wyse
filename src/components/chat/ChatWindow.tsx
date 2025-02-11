import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  chatId: Id<"chats">;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const chat = useQuery(api.chats.get, { chatId });
  const messages = useQuery(api.messages.list, { chatId });
  const sendMessage = useMutation(api.messages.send);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    await sendMessage({
      chatId,
      content,
    });
  };

  if (!chat) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Chat header */}
      <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {chat.name || "Unnamed Chat"}
        </h2>
        {chat.description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">{chat.description}</p>
        )}
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages || []} />
      </div>

      {/* input field */}
      <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
