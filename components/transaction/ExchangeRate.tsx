interface ExchangeRateProps {
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
}

const ExchangeRate = ({
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
}: ExchangeRateProps) => {
  const calculateRate = () => {
    const from = parseFloat(fromAmount);
    const to = parseFloat(toAmount);
    if (!from || !to || isNaN(from) || isNaN(to)) return null;

    const rate = to / from;
    return `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`;
  };

  return <div className="mt-1 text-sm text-gray-500">{calculateRate()}</div>;
};

export default ExchangeRate;
