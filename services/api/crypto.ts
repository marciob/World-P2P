const BASE_URL = "https://api.coingecko.com/api/v3";

interface CryptoPrice {
  [key: string]: {
    usd: number;
  };
}

export async function fetchCryptoPrice(coin: string): Promise<number> {
  try {
    const response = await fetch(
      `${BASE_URL}/simple/price?ids=${coin}&vs_currencies=usd`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch crypto price");
    }

    const data: CryptoPrice = await response.json();
    return data[coin].usd;
  } catch (error) {
    console.error(`Error fetching ${coin} price:`, error);
    throw error;
  }
}

export async function convertCryptoToFiat(
  amount: number,
  cryptoPrice: number,
  rates: { [key: string]: number },
  toCurrency: string
): Promise<number> {
  const amountInUSD = amount * cryptoPrice;

  if (toCurrency === "USD") return amountInUSD;

  const rate = rates[toCurrency];
  if (!rate) throw new Error(`Rate not found for ${toCurrency}`);

  return amountInUSD * rate;
}
