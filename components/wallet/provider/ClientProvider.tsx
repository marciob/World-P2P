"use client";
import { ReactNode } from "react";
import { WalletProvider } from "../context/WalletContext";
import { TransactionProvider } from "@/components/transaction/TransactionContext";

export function ClientProvider({ children }: { children: ReactNode }) {
  return <WalletProvider>
    <TransactionProvider>
    {children}
    </TransactionProvider>
    </WalletProvider>;
}
