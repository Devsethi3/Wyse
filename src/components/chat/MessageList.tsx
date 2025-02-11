import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";

interface MessageListProps {
  messages: Doc<"messages">[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4 px-2">
      {messages.map((message) => (
        <div key={message._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm 
        dark:shadow-gray-900">
          <div className="text-gray-900 dark:text-gray-100">{message.content}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {new Date(message.timestamp).toLocaleString()}
            {message.isEdited && " (edited)"}
          </div>
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-sm"
                >
                  {reaction.emoji}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
