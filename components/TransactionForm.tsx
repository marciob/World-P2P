"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [showCurrencyFrom, setShowCurrencyFrom] = useState(false);
  const [showCurrencyTo, setShowCurrencyTo] = useState(false);
  const { isConnected } = useWallet();

  const currencies = [
    { symbol: "USDT", color: "bg-teal-500" },
    { symbol: "BTC", color: "bg-orange-500" },
    { symbol: "ETH", color: "bg-purple-500" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen w-full overflow-hidden">
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          {/* From Currency Input */}
          <div className="bg-gray-50 rounded-xl p-4 relative border border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 whitespace-nowrap min-w-[3rem]">
                I have
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-50 px-3 py-2 rounded-lg w-[120px] text-right focus:outline-none focus:ring-1 focus:ring-yellow-500 text-gray-700"
                placeholder="0.00"
              />
              <div className="relative">
                <button
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => setShowCurrencyFrom(!showCurrencyFrom)}
                >
                  <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-700">USDT</span>
                  <ChevronDown size={20} className="text-gray-400" />
                </button>

                {showCurrencyFrom && (
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                    {currencies.map((currency) => (
                      <button
                        key={currency.symbol}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                        onClick={() => setShowCurrencyFrom(false)}
                      >
                        <div
                          className={`w-6 h-6 ${currency.color} rounded-full`}
                        ></div>
                        <span>{currency.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* To Currency Input */}
          <div className="bg-gray-50 rounded-xl p-4 relative border border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 whitespace-nowrap min-w-[3rem]">
                I want
              </span>
              <input
                type="number"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="bg-gray-50 px-3 py-2 rounded-lg w-[120px] text-right focus:outline-none focus:ring-1 focus:ring-yellow-500 text-gray-700"
                placeholder="0.00"
              />
              <div className="relative">
                <button
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => setShowCurrencyTo(!showCurrencyTo)}
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">ARS</span>
                  <ChevronDown size={20} className="text-gray-400" />
                </button>

                {showCurrencyTo && (
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                    {currencies.map((currency) => (
                      <button
                        key={currency.symbol}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                        onClick={() => setShowCurrencyTo(false)}
                      >
                        <div
                          className={`w-6 h-6 ${currency.color} rounded-full`}
                        ></div>
                        <span>{currency.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          className={`w-full font-bold py-4 rounded-xl mt-8 ${
            isConnected
              ? "bg-yellow-500 text-black hover:bg-yellow-400"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          } transition-colors`}
        >
          {isConnected ? "Next" : "Connect Wallet"}
        </button>

        <button className="w-full text-center text-gray-400 py-2 hover:text-gray-600 transition-colors">
          See All Offers
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
