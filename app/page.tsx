"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileCheck from "../components/MobileCheck";
import TransactionForm from "../components/transaction/TransactionForm";
import { useSession } from "next-auth/react";
import LoginPage from './login/page';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  // store session in local storage
  localStorage.setItem("session", JSON.stringify(session));
  console.log("session ", session);

  return (
    <MobileCheck>
      {session ? (
        <main className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <TransactionForm />
          </div>
        </main>
      ) : (
        <LoginPage />
      )}
    </MobileCheck>
  );
}
