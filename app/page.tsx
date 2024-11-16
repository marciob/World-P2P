"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileCheck from "../components/MobileCheck";
import TransactionForm from "../components/transaction/TransactionForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <MobileCheck>
      <main className="min-h-screen bg-gray-50 w-full max-w-md mx-auto">
        <TransactionForm />
      </main>
    </MobileCheck>
  );
}
