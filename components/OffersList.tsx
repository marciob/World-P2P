"use client";
import { User } from "lucide-react";

type Offer = {
  id: string;
  user: {
    name: string;
    rating: number;
    trades: number;
  };
  price: number;
  currency: string;
  paymentMethod: string;
  available: number;
  limits: {
    min: number;
    max: number;
  };
};

const mockOffers: Offer[] = [
  {
    id: "1",
    user: {
      name: "John Trader",
      rating: 4.8,
      trades: 123,
    },
    price: 35.5,
    currency: "USDT",
    paymentMethod: "PromptPay",
    available: 175000,
    limits: {
      min: 3500,
      max: 175000,
    },
  },
  {
    id: "2",
    user: {
      name: "Alice Crypto",
      rating: 4.9,
      trades: 256,
    },
    price: 35.45,
    currency: "USDT",
    paymentMethod: "Bank Transfer",
    available: 105000,
    limits: {
      min: 1750,
      max: 105000,
    },
  },
  {
    id: "3",
    user: {
      name: "Bob Exchange",
      rating: 4.7,
      trades: 89,
    },
    price: 35.55,
    currency: "USDT",
    paymentMethod: "PayPal",
    available: 350000,
    limits: {
      min: 7000,
      max: 350000,
    },
  },
];

const OffersList = () => {
  return (
    <div className="space-y-4">
      {mockOffers.map((offer) => (
        <div
          key={offer.id}
          className="bg-white rounded-xl p-4 border border-gray-100 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {offer.user.name}
                </div>
                <div className="text-sm text-gray-500">
                  {offer.user.rating} ★ • {offer.user.trades} trades
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ${offer.price}
              </div>
              <div className="text-sm text-gray-500">{offer.currency}</div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <div>Payment Method</div>
            <div className="font-medium text-gray-900">
              {offer.paymentMethod}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <div>Available</div>
            <div className="font-medium text-gray-900">${offer.available}</div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <div>Limits</div>
            <div className="font-medium text-gray-900">
              ${offer.limits.min} - ${offer.limits.max}
            </div>
          </div>
          <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors">
            Buy {offer.currency}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OffersList;
