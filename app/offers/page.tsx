"use client";
import { useRouter } from "next/navigation";
import OffersList from "@/components/transaction/OffersList";
import { CircleUserRound, ArrowLeft } from "lucide-react";
import Identicon from "@/components/common/Identicon";
import { useWallet } from "@/components/wallet/context/WalletContext";

export default function OffersPage() {
  const router = useRouter();
  const { address } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100">
                  {address ? (
                    <Identicon value={address} size={40} />
                  ) : (
                    <CircleUserRound className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <h1 className="text-xl font-semibold text-gray-800">
                  P2P Transactions
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <OffersList />
      </div>
    </div>
  );
}
