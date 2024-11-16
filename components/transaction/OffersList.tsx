"use client";
import { Star, ArrowRight, MessageCircle, AlertCircle } from "lucide-react";

type Offer = {
  id: string;
  user: {
    name: string;
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
    currency: "USDC",
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
    currency: "USDC",
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
    currency: "USDC",
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
      <div className="space-y-4">
        {mockOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-semibold text-lg">
                  {offer.user.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {offer.user.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1">{offer.user.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                      {offer.user.trades} trades
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${offer.price}
                </div>
                <div className="text-sm text-gray-500">{offer.currency}</div>
              </div>
            </div>

            <div className="space-y-2 bg-gray-50 p-3 rounded-xl">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="font-medium text-gray-900">
                  ${offer.available.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Limits</span>
                <span className="font-medium text-gray-900">
                  ${offer.limits.min.toLocaleString()} - $
                  {offer.limits.max.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">
                Buy {offer.currency}
              </button>
              <button className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersList;
