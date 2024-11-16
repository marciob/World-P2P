const BASE_URL = "https://api.frankfurter.app";

export interface ExchangeRates {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export async function fetchExchangeRates(base: string): Promise<ExchangeRates> {
  try {
    const response = await fetch(`${BASE_URL}/latest?base=${base}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
}

export function convertCurrency(
  amount: number,
  rates: ExchangeRates["rates"],
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) return amount;

  const rate = rates[toCurrency];
  if (!rate) throw new Error(`Rate not found for ${toCurrency}`);

  return amount * rate;
}
