"use client";
import { useEffect, useRef, useState } from "react";

interface MapProps {
  className?: string;
}

interface FireMarker {
  id: number;
  position: google.maps.LatLng;
}

const Map = ({ className }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [fireMarkers, setFireMarkers] = useState<FireMarker[]>([]);
  const markerId = useRef(0);

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
    if (!map || !position) return;

    const markerIdCurrent = markerId.current++;

    // Create a marker at the user's current location
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(position.lat, position.lng),
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 0, // Invisible, only using the label
      },
      label: {
        text: "💸",
        fontSize: "48px",
        className: "marker-label animate-marker-glow-once", // Glow effect
      },
      optimized: false,
    });

    setFireMarkers((prev) => [
      ...prev,
      { id: markerIdCurrent, position: marker.getPosition()! },
    ]);

    // Remove marker after animation
    setTimeout(() => {
      marker.setMap(null);
      setFireMarkers((prev) => prev.filter((m) => m.id !== markerIdCurrent));
    }, 2000);
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
            shadow-lg transition-all duration-300 hover:bg-green-600 relative`}
          onClick={handleClick}
          aria-label="Money button"
        >
          <span
            className={`text-4xl transition-transform duration-300`}
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
