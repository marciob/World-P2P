import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { WalletProvider } from "@/contexts/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Dorado Exchange",
  description: "P2P Exchange Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    { ssr: false }
  );

  return (
    <html lang="en">
      <NextAuthProvider>
        <ErudaProvider>
          <MiniKitProvider>
            <WalletProvider>
              <body className={`${inter.className} bg-gray-900 text-white`}>
                {children}
              </body>
            </WalletProvider>
          </MiniKitProvider>
        </ErudaProvider>
      </NextAuthProvider>
    </html>
  );
}
