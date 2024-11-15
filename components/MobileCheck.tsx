// components/MobileCheck.tsx
import { useEffect, useState } from "react";

const MobileCheck = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isClient) return null;

  if (!isMobile) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-800 text-white p-4 text-center">
        <div>
          <h1 className="text-2xl mb-2">Mobile Only Access</h1>
          <p>Please access this application from a mobile device.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileCheck;
