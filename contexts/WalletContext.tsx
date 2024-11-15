"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connectWallet: (type: string) => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setIsConnected(true);
      setAddress(savedAddress);
    }
  }, []);

  const connectWallet = async (type: string) => {
    try {
      // Add your wallet connection logic here
      console.log(`Connecting to ${type}`);
      const mockAddress = "0x1234...5678"; // Replace with actual wallet connection
      setIsConnected(true);
      setAddress(mockAddress);
      localStorage.setItem("walletAddress", mockAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      disconnectWallet();
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    localStorage.removeItem("walletAddress");
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
