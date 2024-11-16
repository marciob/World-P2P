"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Offer } from "./types";

type OffersContextType = {
  offers: Offer[];
  addOffer: (offer: Offer) => void;
  userOffers: Offer[];
};

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export function OffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);

  const addOffer = (newOffer: Offer) => {
    setOffers((prev) => [newOffer, ...prev]);
  };

  const userOffers = offers.filter((offer) => offer.isUserOffer);

  return (
    <OffersContext.Provider value={{ offers, addOffer, userOffers }}>
      {children}
    </OffersContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error("useOffers must be used within an OffersProvider");
  }
  return context;
}
