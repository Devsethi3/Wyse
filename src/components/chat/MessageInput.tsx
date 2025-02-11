import React from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 
        dark:hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        dark:focus:ring-offset-gray-800"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
