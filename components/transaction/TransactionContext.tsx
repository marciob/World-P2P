"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  MiniAppSendTransactionPayload,
  MiniKit,
  ResponseEvent,
} from "@worldcoin/minikit-js";
import TraderABI from "../../abi/Trader.json";
import ERC20ABI from "../../abi/IERC20.json";
import { useSession } from "next-auth/react";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { ethers } from "ethers";
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

interface TransactionContextType {
  approveToken: (token: string) => Promise<void>;
  createListing: (
    asset: string,
    amount: string,
    price: string
  ) => Promise<void>;
  cancelListing: (index: number) => Promise<void>;
  getListings: () => Promise<void>;
  getSellerListings: (account: string) => Promise<void>;
  transactionId: string | null;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const contractAddress = "0xFb5b8a51d1E3A084805bc4FF3Ed112AFeC01F2b3";
  const { data: session } = useSession();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppSendTransaction,
      async (payload: MiniAppSendTransactionPayload) => {
        if (payload.status === "error") {
          console.error("Error sending transaction", payload);
        } else {
          setTransactionId(payload.transaction_id);
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppSendTransaction);
    };
  }, []);

  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const approveToken = async (token: string) => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    const deadline = Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString()

    const permitTransfer = {
      permitted: {
        token: token,
        amount: '5000000000000000000',
      },
      nonce: Date.now().toString(),
      deadline,
    }

    try {
      const { commandPayload, finalPayload } =
        await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: "0xA0C794A7896285c893385B18E8BaF4F0eB87C836",
              abi: [
                {
                  type: "function",
                  name: "approve",
                  inputs: [
                    {
                      name: "spender",
                      type: "address",
                      internalType: "address",
                    },
                    { name: "value", type: "uint256", internalType: "uint256" },
                  ],
                  outputs: [{ name: "", type: "bool", internalType: "bool" }],
                  stateMutability: "nonpayable",
                },
                {
                  type: "function",
                  name: "mint",
                  inputs: [
                    {
                      name: "amount",
                      type: "uint256",
                      internalType: "uint256",
                    },
                  ],
                  outputs: [],
                  stateMutability: "nonpayable",
                },
              ],
              functionName: "approve",
              args: [contractAddress, "5000000000000000000"],
            },
          ],
          permit2: [
            {
                ...permitTransfer,
              spender: contractAddress,
            },
          ],
        });
      console.log("commandPayload", commandPayload);
      console.log("finalPayload", finalPayload);
    } catch (error) {
      console.error("Failed to approve token:", error);
    }
  };

  const callContract = async (functionName: string, args: any[]) => {
    if (!MiniKit.isInstalled()) {
      return;
    }
    const name = session?.user?.name;
    if (!name) {
      return;
    }
    try {
      const deadline = Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString();
      const { commandPayload, finalPayload } =
        await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: contractAddress,
              abi: TraderABI.abi,
              functionName: functionName,
              args: args,
            },
          ],
        });

      if (finalPayload.status === "error") {
        console.error("Error sending transaction", finalPayload);
      } else {
        setTransactionId(finalPayload.transaction_id);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const createListing = async (
    asset: string,
    amount: string,
    price: string
  ) => {
    const name = session?.user?.name;
    await callContract("list", [
      name,
      asset,
      ethers.formatUnits(amount),
      parseInt(price),
    ]);
  };

  const cancelListing = async (index: number) => {
    await callContract("cancelListing", [index]);
  };

  const getListings = async () => {
    await callContract("listings", []);
  };

  const getSellerListings = async (account: string) => {
    await callContract("getListingsBySeller", [account]);
  };

  return (
    <TransactionContext.Provider
      value={{
        approveToken,
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
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
