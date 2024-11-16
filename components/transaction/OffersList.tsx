"use client";
import { Star, ArrowRight, MessageCircle, AlertCircle } from "lucide-react";
import Identicon from "../common/Identicon";

type Offer = {
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
};

const mockOffers: Offer[] = [
  {
    id: "3",
    user: {
      address: "0x7890abcdef1234567890abcdef1234567890abcd",
      rating: 4.7,
      trades: 89,
    },
    price: 1.0,
    currency: "USDC",
    available: 350000,
    limits: {
      min: 100,
      max: 350000,
    },
  },
  {
    id: "4",
    user: {
      address: "0x9876543210fedcba9876543210fedcba98765432",
      rating: 4.95,
      trades: 432,
    },
    price: 35.55,
    currency: "THB",
    available: 1000000,
    limits: {
      min: 1000,
      max: 1000000,
    },
  },
  {
    id: "5",
    user: {
      address: "0xdef0123456789abcdef0123456789abcdef0123",
      rating: 4.85,
      trades: 167,
    },
    price: 1.08,
    currency: "EUR",
    available: 250000,
    limits: {
      min: 500,
      max: 250000,
    },
  },
];

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

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
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                  <Identicon value={offer.user.address} size={48} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {shortenAddress(offer.user.address)}
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
                <div className="text-sm text-gray-500 mb-0.5">Price</div>
                <div className="text-lg font-semibold text-gray-900">
                  {offer.currency === "USDC" ? "$" : ""}
                  {offer.price.toLocaleString()}
                  {offer.currency !== "USDC" ? ` ${offer.currency}` : ""}
                </div>
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
