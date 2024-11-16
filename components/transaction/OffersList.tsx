"use client";
import { User, Star, ArrowRight, AlertCircle } from "lucide-react";

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
    currency: "USDC",
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
    currency: "USDC",
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
    currency: "USDC",
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
      <div className="space-y-3">
        {mockOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-lg font-semibold text-gray-600">
                      {offer.user.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {offer.user.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                      />
                      <span>{offer.user.rating}</span>
                      <span className="mx-1.5">•</span>
                      <span>{offer.user.trades} trades</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${offer.price}
                  </p>
                  <p className="text-sm text-gray-500">{offer.currency}</p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">
                    {offer.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Available</p>
                  <p className="font-medium text-gray-900">
                    ${offer.available.toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Limits</p>
                  <p className="font-medium text-gray-900">
                    ${offer.limits.min.toLocaleString()} - $
                    {offer.limits.max.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="mt-4 w-full py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center font-medium">
                Buy {offer.currency}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersList;
