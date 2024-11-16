export type Offer = {
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
