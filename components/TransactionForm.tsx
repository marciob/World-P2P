"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, ArrowUpDown } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import OffersList from "./OffersList";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [showCurrencyFrom, setShowCurrencyFrom] = useState(false);
  const [showCurrencyTo, setShowCurrencyTo] = useState(false);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState({
    symbol: "USDT",
    color: "bg-teal-500",
  });
  const [selectedToCurrency, setSelectedToCurrency] = useState({
    symbol: "THB",
    color: "bg-blue-500",
  });
  const { isConnected } = useWallet();
  const [showOffers, setShowOffers] = useState(false);

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyFrom(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyTo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currencies = [
    { symbol: "USDT", color: "bg-teal-500" },
    { symbol: "BTC", color: "bg-orange-500" },
    { symbol: "ETH", color: "bg-purple-500" },
  ];

  const handleFromCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedFromCurrency(currency);
    setShowCurrencyFrom(false);
  };

  const handleToCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedToCurrency(currency);
    setShowCurrencyTo(false);
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = selectedFromCurrency;
    setSelectedFromCurrency(selectedToCurrency);
    setSelectedToCurrency(tempCurrency);

    const tempAmount = amount;
    setAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen w-full overflow-hidden">
      {!showOffers ? (
        <>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">Guest</div>
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div className="space-y-4 relative">
              {/* From Currency Input */}
              <div className="bg-gray-50 rounded-xl p-4 relative border border-gray-100 mb-20">
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
                  <div className="relative" ref={fromDropdownRef}>
                    <button
                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      onClick={() => setShowCurrencyFrom(!showCurrencyFrom)}
                    >
                      <div
                        className={`w-6 h-6 ${selectedFromCurrency.color} rounded-full`}
                      ></div>
                      <span className="text-gray-700">
                        {selectedFromCurrency.symbol}
                      </span>
                      <ChevronDown size={20} className="text-gray-400" />
                    </button>

                    {showCurrencyFrom && (
                      <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                        {currencies.map((currency) => (
                          <button
                            key={currency.symbol}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                            onClick={() => handleFromCurrencySelect(currency)}
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

              {/* Swap Button */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pb-10">
                <button
                  onClick={handleSwapCurrencies}
                  className="bg-white border border-gray-100 rounded-full p-2 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <ArrowUpDown size={20} className="text-gray-400" />
                </button>
              </div>

              {/* To Currency Input */}
              <div className="bg-gray-50 rounded-xl p-4 relative border border-gray-100 mt-12">
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
                  <div className="relative" ref={toDropdownRef}>
                    <button
                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      onClick={() => setShowCurrencyTo(!showCurrencyTo)}
                    >
                      <div
                        className={`w-6 h-6 ${selectedToCurrency.color} rounded-full`}
                      ></div>
                      <span className="text-gray-700">
                        {selectedToCurrency.symbol}
                      </span>
                      <ChevronDown size={20} className="text-gray-400" />
                    </button>

                    {showCurrencyTo && (
                      <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                        {currencies.map((currency) => (
                          <button
                            key={currency.symbol}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                            onClick={() => handleToCurrencySelect(currency)}
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

            <button
              onClick={() => setShowOffers(true)}
              className="w-full text-center text-gray-400 py-2 hover:text-gray-600 transition-colors"
            >
              See All Offers
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={() => setShowOffers(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Exchange
            </button>
          </div>
          <div className="p-4">
            <OffersList />
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionForm;
