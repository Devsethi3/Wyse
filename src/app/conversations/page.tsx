"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatList from "@/components/chat/ChatList";
import { Menu, X } from "lucide-react";

const ConversationPage = () => {
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const chats = useQuery(api.chats.list);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 px-3 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 
         dark:shadow-gray-900/50"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 lg:w-80 w-full transform 
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out 
        border-r dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0`}
      >
        <ChatList
          chats={chats || []}
          selectedChatId={selectedChatId}
          onSelectChat={(chatId) => {
            setSelectedChatId(chatId);
            setIsMobileMenuOpen(false);
          }}
        />
      </div>

      <div className="flex-1 md:ml-0">
        {selectedChatId ? (
          // @ts-ignore
          <ChatWindow chatId={selectedChatId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;
