"use client";
import { useState } from "react";
import {
  ChevronLeft,
  Copy,
  ExternalLink,
  Star,
  CircleUserRound,
  Mail,
  LogOut,
} from "lucide-react";
import Identicon from "../common/Identicon";
import { signOut } from "next-auth/react";

interface Transaction {
  pair: string;
  amount: string;
  date: string;
  status: string;
}

interface ProfileProps {
  onBack: () => void;
  address: string | null;
}

const Profile = ({ onBack, address }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("balance");

  const handleLogout = () => {
    console.log("logout");
    signOut();
  };

  const mockTransactions: Transaction[] = [
    {
      pair: "ETH/USDC",
      amount: "$1,500.00",
      date: "Today, 2:30 PM",
      status: "Payment confirmation sent",
    },
    {
      pair: "BTC/THB",
      amount: "$250,000.00",
      date: "Yesterday, 11:45 AM",
      status: "Please confirm the payment details",
    },
    {
      pair: "ETH/USDC",
      amount: "$3,200.00",
      date: "Apr 15, 9:20 AM",
      status: "Transaction completed successfully",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shortenAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-gray-600">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  {address ? (
                    <Identicon value={address} size={48} />
                  ) : (
                    <CircleUserRound className="w-7 h-7 text-gray-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">User Name</h2>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span>4.8</span>
                    <span className="text-gray-500">• 123 trades</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>
                  {address ? shortenAddress(address) : "Not Connected"}
                </span>
                {address && (
                  <>
                    <button
                      onClick={() => copyToClipboard(address)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Copy size={14} />
                    </button>
                    <a
                      href={`https://etherscan.io/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              className={`pb-4 px-2 ${
                activeTab === "balance"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("balance")}
            >
              Balances
            </button>
            <button
              className={`pb-4 px-2 ${
                activeTab === "history"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>

          {activeTab === "balance" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src="/currencies/usdc.png"
                    alt="USDC"
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <div className="font-medium">USDC</div>
                    <div className="text-sm text-gray-500">USD Coin</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">1,000.00</div>
                  <div className="text-sm text-gray-500">≈ $1,000.00</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src="/currencies/bitcoin.png"
                    alt="BTC"
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <div className="font-medium">BTC</div>
                    <div className="text-sm text-gray-500">Bitcoin</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">0.05</div>
                  <div className="text-sm text-gray-500">≈ $3,250.00</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {mockTransactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <div className="font-medium">{tx.pair}</div>
                    <div className="text-sm text-gray-500">{tx.amount}</div>
                    <div className="text-xs text-gray-400">{tx.date}</div>
                  </div>
                  <div className="text-sm text-gray-600">{tx.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-500 mr-3" />
            <span>Set Email Recovery Method</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
          <div className="flex items-center" onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-gray-600 mr-3" />
            <span>Logout from World ID</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
