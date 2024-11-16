"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkConnection();
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("disconnect", disconnectWallet);
      }

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("disconnect", disconnectWallet);
        }
      };
    }
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setIsConnected(true);
      setAddress(accounts[0]);
    } else {
      disconnectWallet();
    }
  };

  const connectWallet = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    try {
      const res = await fetch(`/api/nonce`);
      const { nonce } = await res.json();

      const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        requestId: '0', // Optional
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: 'This is my statement and here is a link https://worldcoin.com/apps',
      });

      console.log("connect wallet ", generateMessageResult, finalPayload);

      if (finalPayload.status === 'error') {
        return
      } else {
        const response = await fetch('/api/complete-siwe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payload: finalPayload,
            nonce,
          }),
        })
      }

      const walletAddress = MiniKit.walletAddress

      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      setIsConnected(true);
      setAddress(walletAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      disconnectWallet();
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        connectWallet,
        disconnectWallet,
        isDropdownOpen,
        setIsDropdownOpen,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  console.log("context", context);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
