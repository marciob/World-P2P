"use client";
import { useState } from "react";
import { useWallet } from "@/components/wallet/context/WalletContext";
import { ChevronDown } from "lucide-react";
import { shortenAddress } from "@/components/wallet/utils/addressUtils";

const ConnectButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = () => {
    if (!isConnected) {
      connectWallet();
    } else {
      disconnectWallet();
    }
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
        {isConnected && address ? shortenAddress(address) : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectButton;
