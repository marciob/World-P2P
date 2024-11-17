"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowUpDown, MessageSquareText, CircleUserRound } from "lucide-react";
import { useWallet } from "@/components/wallet/context/WalletContext";
import OffersList from "./OffersList";
import NumberKeyboard from "./NumberKeyboard";
import CurrencySelect from "./CurrencySelect";
import AmountInput from "./AmountInput";
import { fetchExchangeRates, ExchangeRates } from "@/services/api/currency";
import { fetchCryptoPrice, convertCryptoToFiat } from "@/services/api/crypto";
import ExchangeRate from "./ExchangeRate";
import ChatHistory from "../chat/ChatHistory";
import Profile from "../profile/Profile";
import Identicon from "../common/Identicon";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { useRouter } from "next/navigation";
// import { createListing } from "../../utils/transactions";
import { useOffers } from "./OffersContext";
import { useTransaction } from "@/components/transaction/TransactionContext";
import { ethers } from "ethers";

type Currency = {
  symbol: string;
  color: string;
  icon: string;
};

type Offer = {
  id: string;
  user: {
    address: string;
    rating: number;
    trades: number;
  };
  price: number;
  currency: string;
  available: number;
  limits: {
    min: number;
    max: number;
  };
  isUserOffer?: boolean;
  status?: "active" | "completed" | "cancelled";
  createdAt?: string;
};

const currencies: Currency[] = [
  {
    symbol: "BTC",
    color: "bg-orange-500",
    icon: "/currencies/bitcoin.png",
  },
  {
    symbol: "ETH",
    color: "bg-purple-500",
    icon: "/currencies/ethereum.png",
  },
  {
    symbol: "USDC",
    color: "bg-teal-500",
    icon: "/currencies/usdc.png",
  },
  {
    symbol: "THB",
    color: "bg-green-500",
    icon: "/currencies/thailand.png",
  },
  {
    symbol: "EUR",
    color: "bg-blue-500",
    icon: "/currencies/euro.png",
  },
];

const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [showCurrencyFrom, setShowCurrencyFrom] = useState(false);
  const [showCurrencyTo, setShowCurrencyTo] = useState(false);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<Currency>({
    symbol: "USDC",
    color: "bg-teal-500",
    icon: "/currencies/usdc.png",
  });
  const [selectedToCurrency, setSelectedToCurrency] = useState<Currency>({
    symbol: "THB",
    color: "bg-green-500",
    icon: "/currencies/thailand.png",
  });
  const {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useWallet();
  const { createListing, approveToken } = useTransaction();
  const [showOffers, setShowOffers] = useState(false);
  const sendInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mockBalance, setMockBalance] = useState("1,000.00");
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState<{ [key: string]: number }>(
    {}
  );
  const [isFastRate, setIsFastRate] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isSmallScreen = useSmallScreen();
  const router = useRouter();
  const { addOffer } = useOffers();
  const [userOffers, setUserOffers] = useState<Offer[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const base =
          selectedFromCurrency.symbol === "USDC"
            ? "USD"
            : selectedFromCurrency.symbol;
        const ratesData = await fetchExchangeRates(base);
        setRates(ratesData);
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [selectedFromCurrency.symbol]);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      if (
        selectedFromCurrency.symbol === "BTC" ||
        selectedToCurrency.symbol === "BTC"
      ) {
        const btcPrice = await fetchCryptoPrice("bitcoin");
        setCryptoPrices((prev) => ({ ...prev, BTC: btcPrice }));
      }
      if (
        selectedFromCurrency.symbol === "ETH" ||
        selectedToCurrency.symbol === "ETH"
      ) {
        const ethPrice = await fetchCryptoPrice("ethereum");
        setCryptoPrices((prev) => ({ ...prev, ETH: ethPrice }));
      }
    };

    fetchCryptoPrices();
  }, [selectedFromCurrency.symbol, selectedToCurrency.symbol]);

  useEffect(() => {
    const convertAmount = async () => {
      if (!amount || !rates) {
        setReceiveAmount("");
        return;
      }

      try {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
          setReceiveAmount("");
          return;
        }

        let convertedAmount: number;
        const toSymbol =
          selectedToCurrency.symbol === "USDC"
            ? "USD"
            : selectedToCurrency.symbol;

        if (
          selectedFromCurrency.symbol === "BTC" ||
          selectedFromCurrency.symbol === "ETH"
        ) {
          const cryptoPrice = cryptoPrices[selectedFromCurrency.symbol];
          convertedAmount = await convertCryptoToFiat(
            numAmount,
            cryptoPrice,
            rates.rates,
            toSymbol
          );
        } else {
          const rate = rates.rates[toSymbol] || 1;
          convertedAmount = numAmount * rate;
        }

        if (isFastRate) {
          convertedAmount = convertedAmount * 0.98;
        }

        setReceiveAmount(convertedAmount.toFixed(2));
      } catch (error) {
        console.error("Error converting amount:", error);
        setReceiveAmount("");
      }
    };

    convertAmount();
  }, [
    amount,
    rates,
    selectedToCurrency.symbol,
    cryptoPrices,
    selectedFromCurrency.symbol,
    isFastRate,
  ]);

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

  const handleMaxClick = () => {
    setAmount(mockBalance.replace(/,/g, ""));
  };

  const handleFastRateToggle = () => {
    setIsFastRate(!isFastRate);
  };

  const handleInputClick = () => {
    if (isSmallScreen) {
      setShowKeyboard(true);
    }
  };

  const handleCreateOffer = async() => {
    if (!amount || !isConnected) return;

    await createListing(ethers.ZeroAddress, "1", "100");

    // const newOffer: Offer = {
    //   id: `${Date.now()}`,
    //   user: {
    //     address: address || "",
    //     rating: 5.0,
    //     trades: 0,
    //   },
    //   price: parseFloat(amount),
    //   currency: selectedToCurrency.symbol,
    //   available: parseFloat(amount),
    //   limits: {
    //     min: parseFloat(amount) * 0.1,
    //     max: parseFloat(amount),
    //   },
    //   isUserOffer: true,
    //   status: "active",
    //   createdAt: new Date().toISOString(),
    // };

    // addOffer(newOffer);
    // setUserOffers((prev) => [...prev, newOffer]);
    // router.push("/offers");
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {showProfile ? (
        <Profile onBack={() => setShowProfile(false)} address={address} />
      ) : showChat ? (
        <ChatHistory onBack={() => setShowChat(false)} />
      ) : !showOffers ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => setShowProfile(true)}
                >
                  {address ? (
                    <Identicon value={address} size={40} />
                  ) : (
                    <CircleUserRound className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  P2P Transactions
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowChat(true)}
                >
                  <MessageSquareText className="w-5 h-5" />
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isConnected) {
                        connectWallet();
                      } else {
                        setIsDropdownOpen(!isDropdownOpen);
                      }
                    }}
                    onMouseEnter={() => isConnected && setIsDropdownOpen(true)}
                    className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {isConnected && address ? (
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        {shortenAddress(address)}
                      </span>
                    ) : (
                      "Connect"
                    )}
                  </button>

                  {isConnected && isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            disconnectWallet();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Disconnect Wallet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="p-6 flex-1 space-y-6">
            {/* You Pay Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex-1 min-w-0">
                <AmountInput
                  label="You Pay"
                  amount={amount}
                  onChange={setAmount}
                  balance={`${mockBalance} ${selectedFromCurrency.symbol}`}
                  onMaxClick={handleMaxClick}
                  onClick={handleInputClick}
                  autoFocus={true}
                />
              </div>
              <div className="flex-shrink-0">
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
            <div className="flex justify-center -my-2">
              <button
                onClick={handleSwapCurrencies}
                className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowUpDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* You Receive Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <AmountInput
                    label="You Receive"
                    amount={receiveAmount}
                    onChange={setReceiveAmount}
                  />
                  <ExchangeRate
                    fromAmount={amount}
                    toAmount={receiveAmount}
                    fromCurrency={selectedFromCurrency.symbol}
                    toCurrency={selectedToCurrency.symbol}
                    onFastRateClick={handleFastRateToggle}
                    isFastRate={isFastRate}
                  />
                </div>
              </div>
              <div className="flex-shrink-0 mt-7">
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
              <button
                onClick={() =>
                  isConnected ? handleCreateOffer() : connectWallet()
                }
                className="w-full py-4 px-6 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {isConnected ? "Create Offer" : "Connect"}
              </button>
              <button 
                onClick={() => approveToken("0xA0C794A7896285c893385B18E8BaF4F0eB87C836")}
                className="w-full py-4 px-6 rounded-xl font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Approve {selectedFromCurrency.symbol}
              </button>
              <button
                onClick={() => router.push("/offers")}
                className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                See All Offers
              </button>
            </div>
          </div>

          {!isSmallScreen ? (
            <div className="mt-auto">
              <NumberKeyboard
                onNumberClick={handleNumberClick}
                onBackspace={handleBackspace}
                onClear={handleClear}
              />
            </div>
          ) : (
            <NumberKeyboard
              onNumberClick={handleNumberClick}
              onBackspace={handleBackspace}
              onClear={handleClear}
              isOpen={showKeyboard}
              onClose={() => setShowKeyboard(false)}
            />
          )}

          <div className="mt-auto">
            {/* Offers List */}
            {showOffers && <OffersList userOffers={userOffers} />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => setShowProfile(true)}
              >
                {address ? (
                  <Identicon value={address} size={40} />
                ) : (
                  <CircleUserRound className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                P2P Transactions
              </h2>
            </div>
          </div>

          {/* Main Form */}
          <div className="p-6 flex-1 space-y-8">
            {/* Offers List */}
            <OffersList userOffers={userOffers} />
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
