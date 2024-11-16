import { Delete } from "lucide-react";
import { useSmallScreen } from "@/hooks/useSmallScreen";

interface NumberKeyboardProps {
  onNumberClick: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const NumberKeyboard = ({
  onNumberClick,
  onBackspace,
  onClear,
  isOpen,
  onClose,
}: NumberKeyboardProps) => {
  const isSmallScreen = useSmallScreen();

  const handleNumberClick = (value: string) => {
    onNumberClick(value);
  };

  const keyboardContent = (
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

  if (!isSmallScreen) {
    return keyboardContent;
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />
            {keyboardContent}
          </div>
        </div>
      )}
    </>
  );
};

export default NumberKeyboard;
