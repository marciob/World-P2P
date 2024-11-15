"use client";
import { useState } from "react";

interface TransactionPanelProps {
  isPanelOpen: boolean;
}

const TransactionPanel = ({ isPanelOpen }: TransactionPanelProps) => {
  const [transactionType, setTransactionType] = useState("");
  const [assetType, setAssetType] = useState("");

  const transactionOptions = [
    { value: "buy", label: "Buy 💵" },
    { value: "sell", label: "Sell 💰" },
  ];

  const assetOptions = [
    { value: "cash", label: "Cash 💵" },
    { value: "crypto", label: "Crypto ₿" },
    { value: "gold", label: "Gold 🏆" },
    { value: "stocks", label: "Stocks 📈" },
  ];

  return (
    <div
      className={`fixed inset-x-0 bg-gray-50/80 backdrop-blur-md transition-all duration-300 
        ease-in-out z-20 rounded-t-[2rem] shadow-lg border-t border-gray-100
        ${isPanelOpen ? "bottom-0 h-[50%]" : "-bottom-full h-0"}`}
    >
      {/* Panel Handle */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full 
        transition-all duration-300 hover:bg-gray-400"
      />

      {/* Panel Content */}
      <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          New Transaction
        </h2>

        <div className="flex gap-4 justify-center px-4">
          <div className="flex-1">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full p-4 bg-white rounded-xl border border-gray-100 
                shadow-sm appearance-none cursor-pointer
                focus:outline-none focus:ring-2 
                focus:ring-green-500/20
                transition-all duration-300"
            >
              <option value="">Type</option>
              {transactionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full p-4 bg-white rounded-xl border border-gray-100 
                shadow-sm appearance-none cursor-pointer
                focus:outline-none focus:ring-2 
                focus:ring-green-500/20
                transition-all duration-300"
            >
              <option value="">Asset</option>
              {assetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPanel;
