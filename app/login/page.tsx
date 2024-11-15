"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
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
        <h1 className="text-6xl font-bold text-center">Welcome to Cashing</h1>
      </section>

      <section className="relative z-10 w-full h-1/3 bg-white rounded-t-3xl p-6 flex flex-col items-center justify-center text-gray-900">
        <p className="text-center text-xl mb-4">
          P2P transactions for everyone!c
        </p>
        <button
          onClick={handleLogin}
          className="bg-black text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition mb-4"
        >
          Sign In
        </button>
        <button
          onClick={handleLogin}
          className="text-gray-600 hover:text-gray-800 transition text-lg"
        >
          Skip for now
        </button>
      </section>
    </main>
  );
}
