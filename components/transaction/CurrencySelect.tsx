import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";

type Currency = {
  symbol: string;
  color: string;
  icon: string;
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
        onClick={onToggleDropdown}
        className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50"
      >
        <img
          src={selectedCurrency.icon}
          alt={selectedCurrency.symbol}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
        <span className="font-medium text-gray-900">
          {selectedCurrency.symbol}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="max-h-[250px] sm:max-h-[300px] overflow-y-auto">
            {currencies.map((currency) => (
              <button
                key={currency.symbol}
                onClick={() => onSelect(currency)}
                className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
              >
                <img
                  src={currency.icon}
                  alt={currency.symbol}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
                <span className="font-medium text-gray-900">
                  {currency.symbol}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;
