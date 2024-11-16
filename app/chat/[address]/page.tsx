"use client";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Send,
  Info,
  Star,
  Camera,
  Paperclip,
  X,
  Image,
  FileText,
} from "lucide-react";
import { useState, useRef } from "react";
import Identicon from "@/components/common/Identicon";

type Message = {
  id: number;
  type: "system" | "sender" | "receiver";
  content: string;
  time: string;
  file?: {
    url: string;
    type: string;
    name: string;
  };
};

export default function ChatPage({ params }: { params: { address: string } }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mockMessages: Message[] = [
    {
      id: 1,
      type: "system",
      content: "Trade started for THB/USDC",
      time: "2:30 PM",
    },
    {
      id: 2,
      type: "receiver",
      content: "Hi, I would like to buy THB with USDC",
      time: "2:31 PM",
    },
    {
      id: 3,
      type: "sender",
      content: "Sure, please send the USDC to my wallet address",
      time: "2:32 PM",
    },
  ];

  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<Message[]>([...mockMessages]);

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

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a temporary URL for preview
    const fileUrl = URL.createObjectURL(file);

    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add new message with file
    const newMessage: Message = {
      id: messages.length + 1,
      type: "sender",
      content: file.type.startsWith("image/")
        ? "Sent an image"
        : `Sent a file: ${file.name}`,
      time: timeString,
      file: {
        url: fileUrl,
        type: file.type,
        name: file.name,
      },
    };

    setMessages([...messages, newMessage]);

    // In a real implementation, you would upload the file to your backend here
    try {
      // Simulated upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("File uploaded successfully:", file);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);

      // Convert to file and handle upload
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });
          handleFileUpload({ target: { files: [file] } } as any);
          stopCamera();
        }
      }, "image/jpeg");
    }
  };

  // Update the message rendering to include files
  const renderMessage = (msg: Message) => {
    if (!msg.file) {
      return <div className="text-sm">{msg.content}</div>;
    }

    return (
      <div className="space-y-2">
        <div className="text-sm">{msg.content}</div>
        {msg.file.type.startsWith("image/") ? (
          <img
            src={msg.file.url}
            alt="Uploaded image"
            className="max-w-[200px] rounded-lg"
          />
        ) : (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <FileText size={20} />
            <span className="text-sm truncate">{msg.file.name}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
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
        {messages.map((msg) => (
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
              {renderMessage(msg)}
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

      {showCamera && (
        <div className="absolute inset-0 bg-black z-50">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/50">
            <button
              onClick={stopCamera}
              className="p-2 text-white rounded-full bg-gray-800/50"
            >
              <X size={24} />
            </button>
            <button
              onClick={capturePhoto}
              className="p-4 text-white rounded-full bg-white/20"
            >
              <div className="w-12 h-12 rounded-full border-4 border-white" />
            </button>
            <div className="w-10" /> {/* Spacer for layout balance */}
          </div>
        </div>
      )}

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={startCamera}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Camera size={20} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Paperclip size={20} className="rotate-45" />
            </button>
          </div>
          <input
            type="file"
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
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
