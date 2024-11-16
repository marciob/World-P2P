"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, ArrowUpDown, Wallet2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import OffersList from "./OffersList";

type Currency = {
  symbol: string;
  color: string;
};

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [showCurrencyFrom, setShowCurrencyFrom] = useState(false);
  const [showCurrencyTo, setShowCurrencyTo] = useState(false);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<Currency>({
    symbol: "USDT",
    color: "bg-teal-500",
  });
  const [selectedToCurrency, setSelectedToCurrency] = useState<Currency>({
    symbol: "THB",
    color: "bg-green-500",
  });
  const { isConnected } = useWallet();
  const [showOffers, setShowOffers] = useState(false);

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const sendInputRef = useRef<HTMLInputElement>(null);

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

  const currencies: Currency[] = [
    { symbol: "BTC", color: "bg-orange-500" },
    { symbol: "ETH", color: "bg-purple-500" },
    { symbol: "USDC", color: "bg-blue-500" },
    { symbol: "USDT", color: "bg-teal-500" },
    { symbol: "THB", color: "bg-green-500" },
  ];

  const handleFromCurrencySelect = (currency: Currency) => {
    setSelectedFromCurrency(currency);
    setShowCurrencyFrom(false);
  };

  const handleToCurrencySelect = (currency: Currency) => {
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
    <div className="max-w-md mx-auto bg-white min-h-screen w-full">
      {!showOffers ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Wallet2 className="w-5 h-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                P2P Transactions
              </h2>
            </div>
          </div>

          {/* Main Form */}
          <div className="p-6 flex-1 space-y-8">
            {/* From Currency Section */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                You Send
              </label>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-4">
                  <input
                    ref={sendInputRef}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent text-lg focus:outline-none rounded-lg p-2 text-gray-700"
                    placeholder="0.00"
                    autoFocus
                  />
                  <div className="relative" ref={fromDropdownRef}>
                    <button
                      className="flex items-center space-x-2 bg-gray-200 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                      onClick={() => setShowCurrencyFrom(!showCurrencyFrom)}
                    >
                      <div
                        className={`w-6 h-6 ${selectedFromCurrency.color} rounded-full`}
                      />
                      <span className="font-medium text-gray-900">
                        {selectedFromCurrency.symbol}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-700" />
                    </button>

                    {/* From  */}
                    {showCurrencyFrom && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-50 rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                        <div className="px-3 py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-600">
                            Select Currency
                          </span>
                        </div>
                        {currencies.map((currency) => (
                          <button
                            key={currency.symbol}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-150"
                            onClick={() => handleFromCurrencySelect(currency)}
                          >
                            <div
                              className={`w-6 h-6 ${currency.color} rounded-full`}
                            />
                            <span className="font-medium text-gray-800">
                              {currency.symbol}
                            </span>
                            {currency.symbol ===
                              selectedFromCurrency.symbol && (
                              <span className="ml-auto text-blue-500">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-4">
              <button
                onClick={handleSwapCurrencies}
                className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowUpDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* To Currency Section */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                You Receive
              </label>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    className="flex-1 bg-transparent text-lg focus:outline-none rounded-lg p-2 text-gray-700"
                    placeholder="0.00"
                  />
                  <div className="relative" ref={toDropdownRef}>
                    <button
                      className="flex items-center space-x-2 bg-gray-200 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                      onClick={() => setShowCurrencyTo(!showCurrencyTo)}
                    >
                      <div
                        className={`w-6 h-6 ${selectedToCurrency.color} rounded-full`}
                      />
                      <span className="font-medium text-gray-900">
                        {selectedToCurrency.symbol}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-700" />
                    </button>

                    {showCurrencyTo && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-50 rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                        <div className="px-3 py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-600">
                            Select Currency
                          </span>
                        </div>
                        {currencies.map((currency) => (
                          <button
                            key={currency.symbol}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-150"
                            onClick={() => handleToCurrencySelect(currency)}
                          >
                            <div
                              className={`w-6 h-6 ${currency.color} rounded-full`}
                            />
                            <span className="font-medium text-gray-800">
                              {currency.symbol}
                            </span>
                            {currency.symbol === selectedToCurrency.symbol && (
                              <span className="ml-auto text-blue-500">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                className={`w-full py-4 px-6 rounded-xl font-medium transition-colors ${
                  isConnected
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {isConnected ? "Next" : "Connect Wallet"}
              </button>

              <button
                onClick={() => setShowOffers(true)}
                className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                See All Offers
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={() => setShowOffers(false)}
              className="text-gray-500 hover:text-gray-700 font-medium"
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
