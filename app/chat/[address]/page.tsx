"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import Identicon from "@/components/common/Identicon";

export default function ChatPage({ params }: { params: { address: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const mockMessages = [
    {
      id: 1,
      sender: params.address,
      text: "Hello, I'm interested in your offer",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Hi! Sure, what would you like to know?",
      timestamp: "10:31 AM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Add message handling logic here
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <Identicon value={params.address} size={40} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {`${params.address.slice(0, 6)}...${params.address.slice(
                    -4
                  )}`}
                </h1>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white rounded-xl px-6 hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
