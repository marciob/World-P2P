"use client";
import MobileCheck from "../components/MobileCheck";
import Map from "../components/Map";

export default function Home() {
  return (
    <MobileCheck>
      <main className="relative min-h-screen">
        <div className="relative w-full h-full">
          <Map />
        </div>
        {/* World template components commented for now */}
        {/* <SignIn /> */}
        {/* <VerifyBlock /> */}
        {/* <PayBlock /> */}
      </main>
    </MobileCheck>
  );
}
