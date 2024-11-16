import React from "react";
import { ChevronLeft, Search } from "lucide-react";

const chatHistory = [
  {
    id: 1,
    tradePair: "ETH/USDC",
    amount: "1,500.00",
    lastMessage: "Payment confirmation sent",
    timestamp: "Today, 2:30 PM",
    unread: true,
  },
  {
    id: 2,
    tradePair: "BTC/THB",
    amount: "250,000.00",
    lastMessage: "Please confirm the payment details",
    timestamp: "Yesterday, 11:45 AM",
    unread: false,
  },
  {
    id: 3,
    tradePair: "ETH/USDC",
    amount: "3,200.00",
    lastMessage: "Transaction completed successfully",
    timestamp: "Apr 15, 9:20 AM",
    unread: false,
  },
  {
    id: 4,
    tradePair: "BTC/USDC",
    amount: "5,000.00",
    lastMessage: "Waiting for blockchain confirmation",
    timestamp: "Apr 14, 3:15 PM",
    unread: false,
  },
];

interface ChatHistoryProps {
  onBack: () => void;
}

const ChatHistory = ({ onBack }: ChatHistoryProps) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack}>
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Chat History
            </h1>
          </div>
        </div>

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by pair or amount"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="px-4 py-4 border-b border-gray-100 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {chat.tradePair}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-900">${chat.amount}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-600 flex-1 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread && (
                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
