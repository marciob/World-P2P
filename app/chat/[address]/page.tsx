"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send, Info, Star } from "lucide-react";
import { useState } from "react";
import Identicon from "@/components/common/Identicon";

type Message = {
  id: number;
  type: "system" | "sender" | "receiver";
  content: string;
  time: string;
};

export default function ChatPage({ params }: { params: { address: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  // Reference to mockOffers data structure from OffersList.tsx
  const mockOffer = {
    user: {
      address: params.address,
      rating: 4.95,
      trades: 432,
    },
    price: 35.55,
    currency: "THB",
    amount: 1000,
  };

  const mockMessages: Message[] = [
    {
      id: 1,
      type: "system",
      content: "Trade started for THB/USDT",
      time: "2:30 PM",
    },
    {
      id: 2,
      type: "receiver",
      content: "Hi, I would like to buy THB with USDT",
      time: "2:31 PM",
    },
    {
      id: 3,
      type: "sender",
      content: "Sure, please send the USDT to my wallet address",
      time: "2:32 PM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Trade Chat
              </h1>
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <Info size={24} />
            </button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white">
                <Identicon value={mockOffer.user.address} size={40} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900">
                    {`${mockOffer.user.address.slice(
                      0,
                      6
                    )}...${mockOffer.user.address.slice(-4)}`}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-yellow-500">
                    {mockOffer.user.rating}
                  </span>
                  <span className="text-gray-500">
                    • {mockOffer.user.trades} trades
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-gray-900">
                {mockOffer.price} {mockOffer.currency}
              </div>
              <div className="text-sm text-gray-500">
                Amount: ${mockOffer.amount}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "system"
                ? "justify-center"
                : msg.type === "sender"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.type === "system"
                  ? "bg-gray-100 text-gray-500"
                  : msg.type === "sender"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              } rounded-lg px-4 py-2 max-w-[85%]`}
            >
              <div className="text-sm">{msg.content}</div>
              {msg.type !== "system" && (
                <div
                  className={`text-xs mt-1 ${
                    msg.type === "sender" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
