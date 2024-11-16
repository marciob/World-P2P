"use client";
import { ReactNode } from "react";
import { WalletProvider } from "../context/WalletContext";

export function ClientProvider({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
