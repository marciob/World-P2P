interface ExchangeRateProps {
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
  onFastRateClick: () => void;
  isFastRate: boolean;
}

const ExchangeRate = ({
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  onFastRateClick,
  isFastRate,
}: ExchangeRateProps) => {
  const calculateRate = () => {
    const from = parseFloat(fromAmount);
    const to = parseFloat(toAmount);
    if (!from || !to || isNaN(from) || isNaN(to)) return null;

    const rate = to / from;
    return `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`;
  };

  return (
    <div className="mt-2">
      <div className="text-sm text-gray-500">{calculateRate()}</div>
      {calculateRate() && (
        <button
          onClick={onFastRateClick}
          className={`text-xs flex items-center gap-1 ${
            isFastRate ? "text-green-600" : "text-blue-500 hover:text-blue-600"
          }`}
        >
          <div className="flex items-center">
            {isFastRate ? (
              <>✓ Rate increased by 2%</>
            ) : (
              <>⚡ Speed up rate +2%</>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default ExchangeRate;
