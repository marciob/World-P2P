"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    signIn("worldcoin");
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem("isSkipped", "true");
    window.location.href = "/";
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="relative flex flex-col h-screen bg-gray-800 text-white overflow-hidden font-roboto">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/people3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <section className="flex-grow flex items-center justify-center relative z-10">
        <h1 className="text-6xl font-bold text-center">Welcome to World P2P</h1>
      </section>

      <section className="relative z-10 w-full h-1/3 bg-white rounded-t-3xl p-6 flex flex-col items-center justify-center text-gray-900">
        <p className="text-center text-xl mb-4">P2P s for everyone!</p>
        <button
          onClick={handleLogin}
          className="bg-black text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md 
          hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 mb-4"
        >
          Sign In
        </button>
        <button
          onClick={handleSkip}
          className="text-gray-600 hover:text-gray-800 transition-all duration-300 transform 
          hover:scale-105 active:scale-95 text-lg"
        >
          Skip for now
        </button>
      </section>
    </main>
  );
}
