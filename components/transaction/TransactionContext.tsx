"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MiniKit } from '@worldcoin/minikit-js';
import TraderABI from '../../abi/Trader.json';
import { useSession } from "next-auth/react";
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { ethers } from 'ethers';
import { createPublicClient, http } from 'viem';
import { worldchain } from 'viem/chains';

interface TransactionContextType {
  createListing: (asset: string, amount: string, price: string) => Promise<void>;
  cancelListing: (index: number) => Promise<void>;
  getListings: () => Promise<void>;
  getSellerListings: (account: string) => Promise<void>;
  transactionId: string | null;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const contractAddress = '0xFb5b8a51d1E3A084805bc4FF3Ed112AFeC01F2b3';
  const { data: session } = useSession();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const client = createPublicClient({
    chain: worldchain,
    transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
  });

  const callContract = async (functionName: string, args: any[]) => {
    if (!MiniKit.isInstalled()) {
      return;
    }
    const name = session?.user?.name;
    if (!name) {
      return;
    }
    try {
        const {commandPayload, finalPayload} = await MiniKit.commandsAsync.sendTransaction({
            transaction: [
              {
                address: contractAddress,
                abi: TraderABI.abi,
                functionName: functionName,
                args: args,
              },
            ],
        });

        if (finalPayload.status === 'error') {
            console.error('Error sending transaction', finalPayload)
          } else {
            setTransactionId(finalPayload.transaction_id)
        }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const createListing = async (asset: string, amount: string, price: string) => {
    const name = session?.user?.name;
    await callContract('list', [name, asset, ethers.formatUnits(amount), parseInt(price)]);
  };

  const cancelListing = async (index: number) => {
    await callContract('cancelListing', [index]);
  };

  const getListings = async () => {
    await callContract('listings', []);
  };

  const getSellerListings = async (account: string) => {
    await callContract('getListingsBySeller', [account]);
  };

  return (
    <TransactionContext.Provider
      value={{
        createListing,
        cancelListing,
        getListings,
        getSellerListings,
        transactionId,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  console.log("tx context", context);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
