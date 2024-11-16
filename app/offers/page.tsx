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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                {address ? (
                  <Identicon value={address} size={40} />
                ) : (
                  <CircleUserRound className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Available Offers
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6">
          <OffersList />
        </div>
      </div>
    </main>
  );
}
