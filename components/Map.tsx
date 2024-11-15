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

  useEffect(() => {
    // Get user's current location
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
    // Load Google Maps when the position is available
    if (position && mapRef.current) {
      const loadGoogleMaps = () => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          new google.maps.Map(mapRef.current!, {
            center: position,
            zoom: 15,
          });
        };
      };

      loadGoogleMaps();
    }
  }, [position]);

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
    </div>
  );
};

export default Map;
