"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState("");
  const [assetType, setAssetType] = useState("");
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTransactionOpen(false);
        setIsAssetOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTransactionSelect = (value: string) => {
    setTransactionType(value);
    setIsTransactionOpen(false);
  };

  const handleAssetSelect = (value: string) => {
    setAssetType(value);
    setIsAssetOpen(false);
  };

  const dropdownButtonClass = `
    w-full p-4 bg-white rounded-xl border border-gray-200
    cursor-pointer text-gray-700 flex justify-between items-center
    hover:border-gray-300 transition-all duration-300
  `;

  const dropdownMenuClass = `
    absolute top-full left-0 right-0 mt-2 py-2
    bg-white rounded-xl border border-gray-200 shadow-lg
    z-50 transition-all duration-300 transform
  `;

  const dropdownItemClass = `
    px-4 py-3 text-gray-700
    cursor-pointer transition-all duration-200
    flex items-center hover:bg-green-50 
    hover:text-green-600 hover:pl-6
    active:scale-[0.98]
  `;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        New Transaction
      </h2>

      <div className="space-y-4" ref={dropdownRef}>
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <div
              className={`${dropdownButtonClass} 
                group-hover:border-green-200 group-hover:shadow-sm`}
              onClick={() => setIsTransactionOpen(!isTransactionOpen)}
            >
              <span className="group-hover:text-green-600 transition-colors duration-200">
                {transactionType || "Type"}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-400 transition-transform duration-300
                group-hover:text-green-500
                ${isTransactionOpen ? "rotate-180" : ""}`}
              />
            </div>
            {isTransactionOpen && (
              <div className={`${dropdownMenuClass} animate-fade-in`}>
                {transactionOptions.map((option) => (
                  <div
                    key={option.value}
                    className={dropdownItemClass}
                    onClick={() => handleTransactionSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative group">
            <div
              className={`${dropdownButtonClass} 
                group-hover:border-green-200 group-hover:shadow-sm`}
              onClick={() => setIsAssetOpen(!isAssetOpen)}
            >
              <span className="group-hover:text-green-600 transition-colors duration-200">
                {assetType || "Asset"}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-400 transition-transform duration-300
                group-hover:text-green-500
                ${isAssetOpen ? "rotate-180" : ""}`}
              />
            </div>
            {isAssetOpen && (
              <div className={`${dropdownMenuClass} animate-fade-in`}>
                {assetOptions.map((option) => (
                  <div
                    key={option.value}
                    className={dropdownItemClass}
                    onClick={() => handleAssetSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {transactionType && assetType && (
          <div className="animate-fade-in">
            <button
              className="w-full p-4 bg-green-500 text-white rounded-xl
                transition-all duration-300 hover:bg-green-600 
                active:scale-[0.98] font-medium"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
