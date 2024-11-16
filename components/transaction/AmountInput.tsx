interface AmountInputProps {
  label: string;
  amount: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  balance?: string;
  onMaxClick?: () => void;
  onClick?: () => void;
}

const AmountInput = ({
  label,
  amount,
  onChange,
  inputRef,
  autoFocus,
  balance,
  onMaxClick,
  onClick,
}: AmountInputProps) => {
  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-gray-300 transition-colors">
        <div className="flex items-center space-x-4">
          <input
            ref={inputRef}
            type="number"
            value={amount}
            onChange={(e) => onChange(e.target.value)}
            onClick={onClick}
            className="flex-1 bg-transparent text-lg focus:outline-none rounded-lg p-2 text-gray-700"
            placeholder="0.00"
            autoFocus={autoFocus}
          />
        </div>
      </div>
      {balance && (
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-sm text-gray-500">Your balance: {balance}</span>
          <button
            onClick={onMaxClick}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            max
          </button>
        </div>
      )}
    </div>
  );
};

export default AmountInput;
