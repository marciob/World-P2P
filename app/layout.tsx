import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { ClientProvider } from "@/components/wallet/provider/ClientProvider";
import { OffersProvider } from "@/components/transaction/OffersContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cashing",
  description: "P2P Platform",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    { ssr: false }
  );

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <NextAuthProvider>
          <ErudaProvider>
            <MiniKitProvider>
              <ClientProvider>
                <OffersProvider>
                  <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
                    {children}
                  </div>
                </OffersProvider>
              </ClientProvider>
            </MiniKitProvider>
          </ErudaProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
