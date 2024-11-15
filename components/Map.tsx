"use client";
import { useEffect, useRef, useState } from "react";

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setError("Unable to retrieve your location");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (!position || !mapRef.current) return;

    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        const newMap = new google.maps.Map(mapRef.current!, {
          center: position,
          zoom: 15,
        });
        setMap(newMap);
      };
    };

    loadGoogleMaps();
  }, [position]);

  const handleClick = () => {
    setIsAnimating(true);

    // Trigger animation and reset after delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className={`w-full h-full ${className}`}
        style={{ minHeight: "100vh" }}
      />
      {/* Central button */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          className={`w-20 h-20 rounded-full bg-green-500 flex items-center justify-center 
            shadow-lg transition-all duration-300 hover:bg-green-600 relative
            ${isAnimating ? "scale-110" : ""}`}
          onClick={handleClick}
          aria-label="Money button"
        >
          <span
            className={`text-4xl transition-transform duration-300
            ${isAnimating ? "scale-125 animate-marker-glow-once" : ""}`}
            role="img"
            aria-label="money"
          >
            💸
          </span>
        </button>
      </div>
    </div>
  );
};

export default Map;
