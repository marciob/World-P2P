"use client";
import { useState, useEffect, useRef } from "react";
import { Wallet2, ArrowUpDown } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import OffersList from "./OffersList";
import NumberKeyboard from "./NumberKeyboard";
import CurrencySelect from "./CurrencySelect";
import AmountInput from "./AmountInput";

type Currency = {
  symbol: string;
  color: string;
};

const currencies: Currency[] = [
  { symbol: "BTC", color: "bg-orange-500" },
  { symbol: "ETH", color: "bg-purple-500" },
  { symbol: "USDC", color: "bg-blue-500" },
  { symbol: "USDT", color: "bg-teal-500" },
  { symbol: "THB", color: "bg-green-500" },
];

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
  const sendInputRef = useRef<HTMLInputElement>(null);

  const handleSwapCurrencies = () => {
    const tempCurrency = selectedFromCurrency;
    setSelectedFromCurrency(selectedToCurrency);
    setSelectedToCurrency(tempCurrency);

    const tempAmount = amount;
    setAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  const handleNumberClick = (value: string) => {
    if (value === "." && amount.includes(".")) return;

    if (value !== "." && amount.includes(".")) {
      const decimalPlaces = amount.split(".")[1];
      if (decimalPlaces && decimalPlaces.length >= 8) return;
    }

    setAmount((prev) => prev + value);
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAmount("");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen w-full flex flex-col">
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
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <AmountInput
                  label="You Pay"
                  amount={amount}
                  onChange={setAmount}
                  inputRef={sendInputRef}
                  autoFocus
                />
              </div>
              <div className="mt-7">
                <CurrencySelect
                  selectedCurrency={selectedFromCurrency}
                  currencies={currencies}
                  showDropdown={showCurrencyFrom}
                  onToggleDropdown={() =>
                    setShowCurrencyFrom(!showCurrencyFrom)
                  }
                  onSelect={(currency) => {
                    setSelectedFromCurrency(currency);
                    setShowCurrencyFrom(false);
                  }}
                />
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

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <AmountInput
                  label="You Receive"
                  amount={receiveAmount}
                  onChange={setReceiveAmount}
                />
              </div>
              <div className="mt-7">
                <CurrencySelect
                  selectedCurrency={selectedToCurrency}
                  currencies={currencies}
                  showDropdown={showCurrencyTo}
                  onToggleDropdown={() => setShowCurrencyTo(!showCurrencyTo)}
                  onSelect={(currency) => {
                    setSelectedToCurrency(currency);
                    setShowCurrencyTo(false);
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full py-4 px-6 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors">
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

          <div className="mt-auto">
            <NumberKeyboard
              onNumberClick={handleNumberClick}
              onBackspace={handleBackspace}
              onClear={handleClear}
            />
          </div>

          <div className="mt-auto">
            {/* Offers List */}
            {showOffers && <OffersList />}
          </div>
        </div>
      ) : (
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
            {/* Offers List */}
            <OffersList />
          </div>

          <div className="mt-auto">
            {/* Back Button */}
            <button
              onClick={() => setShowOffers(false)}
              className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
