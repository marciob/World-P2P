import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";

type Currency = {
  symbol: string;
  color: string;
};

interface CurrencySelectProps {
  selectedCurrency: Currency;
  currencies: Currency[];
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onSelect: (currency: Currency) => void;
}

const CurrencySelect = ({
  selectedCurrency,
  currencies,
  showDropdown,
  onToggleDropdown,
  onSelect,
}: CurrencySelectProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggleDropdown();
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, onToggleDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 bg-gray-200 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        onClick={onToggleDropdown}
      >
        <div className={`w-6 h-6 ${selectedCurrency.color} rounded-full`} />
        <span className="font-medium text-gray-900">
          {selectedCurrency.symbol}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-700" />
      </button>

      {showDropdown && (
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
              onClick={() => onSelect(currency)}
            >
              <div className={`w-6 h-6 ${currency.color} rounded-full`} />
              <span className="font-medium text-gray-800">
                {currency.symbol}
              </span>
              {currency.symbol === selectedCurrency.symbol && (
                <span className="ml-auto text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;
