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
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <TransactionForm />
        </div>
      </main>
    </MobileCheck>
  );
}
