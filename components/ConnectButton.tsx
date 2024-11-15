"use client";
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { ChevronDown } from "lucide-react";

const ConnectButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = () => {
    if (!isConnected) {
      setIsDropdownOpen(true);
    } else {
      disconnectWallet();
    }
  };

  const handleWalletSelect = (type: string) => {
    connectWallet(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleConnect}
        className={`
          px-6 py-2.5 rounded-xl font-medium
          transition-all duration-300
          ${
            isConnected
              ? "bg-yellow-500 text-black hover:bg-yellow-600"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }
          active:scale-[0.98]
        `}
      >
        {isConnected ? address : "Connect Wallet"}
      </button>

      {isDropdownOpen && !isConnected && (
        <div className="absolute right-0 mt-2 w-60 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2">
          <button
            onClick={() => handleWalletSelect("metamask")}
            className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center gap-3 text-gray-300"
          >
            <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6" />
            MetaMask
          </button>
          <button
            onClick={() => handleWalletSelect("walletconnect")}
            className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center gap-3 text-gray-300"
          >
            <img
              src="/walletconnect.svg"
              alt="WalletConnect"
              className="w-6 h-6"
            />
            WalletConnect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
