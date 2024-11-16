"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileCheck from "../components/MobileCheck";
import TransactionForm from "../components/transaction/TransactionForm";
import { useSession } from "next-auth/react";
import LoginPage from "./login/page";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session ", session);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    const skipped = localStorage.getItem("isSkipped");
    if (skipped === "true") {
      setIsSkipped(true);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const skipped = localStorage.getItem("isSkipped");
      setIsSkipped(skipped === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <MobileCheck>
      {session || isSkipped ? (
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-md mx-auto relative">
            <TransactionForm />
          </div>
        </main>
      ) : (
        <LoginPage />
      )}
    </MobileCheck>
  );
}
