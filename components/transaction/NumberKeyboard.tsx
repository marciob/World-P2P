import { Delete } from "lucide-react";

interface NumberKeyboardProps {
  onNumberClick: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

const NumberKeyboard = ({
  onNumberClick,
  onBackspace,
  onClear,
}: NumberKeyboardProps) => {
  const handleNumberClick = (value: string) => {
    onNumberClick(value);
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 border-t border-gray-200">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num)}
          className="p-4 text-xl font-medium text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onBackspace}
        className="p-4 text-xl font-medium text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors flex items-center justify-center"
      >
        <Delete className="w-6 h-6" />
      </button>
    </div>
  );
};

export default NumberKeyboard;
