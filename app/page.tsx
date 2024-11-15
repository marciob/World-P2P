"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileCheck from "../components/MobileCheck";
import Map from "../components/Map";
import TransactionPanel from "../components/TransactionPanel";

export default function Home() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldAddMarker, setShouldAddMarker] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  const handleClick = () => {
    setIsAnimating(true);

    if (!isPanelOpen) {
      setShouldAddMarker(true);
      setIsPanelOpen(true);
    } else {
      setIsPanelOpen(false);
    }

    setTimeout(() => {
      setIsAnimating(false);
      setShouldAddMarker(false);
    }, 1000);
  };

  return (
    <MobileCheck>
      <main className="relative min-h-screen">
        <div
          className={`fixed inset-x-0 top-0 z-0 transition-all duration-300 ease-in-out
            ${isPanelOpen ? "h-[50%]" : "h-screen"}`}
        >
          <Map addFireMarker={shouldAddMarker} isPanelOpen={isPanelOpen} />
        </div>

        <TransactionPanel isPanelOpen={isPanelOpen} />

        {/* Button container */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
          <button
            className={`w-20 h-20 rounded-full bg-green-500 flex items-center justify-center 
              shadow-lg transition-all duration-300 hover:bg-green-600 relative
              ${isAnimating ? "scale-110" : ""}`}
            onClick={handleClick}
            aria-label="Money button"
          >
            <span
              className={`text-4xl transition-transform duration-300
                ${isAnimating ? "scale-125" : ""}`}
              role="img"
              aria-label="money"
            >
              💸
            </span>
          </button>
        </div>
      </main>
    </MobileCheck>
  );
}
