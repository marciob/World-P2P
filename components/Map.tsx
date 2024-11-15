"use client";
import { useEffect, useRef, useState } from "react";

interface MapProps {
  className?: string;
  onMapLoad?: (map: google.maps.Map) => void;
  addFireMarker?: boolean;
  isPanelOpen?: boolean;
}

const Map = ({
  className,
  onMapLoad,
  addFireMarker,
  isPanelOpen,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerId = useRef(0);
  const currentPosition = useRef<{ lat: number; lng: number } | null>(null);

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
          styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
          ],
          disableDefaultUI: true,
        });

        new google.maps.Marker({
          position: position,
          map: newMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        setMap(newMap);
        if (onMapLoad) onMapLoad(newMap);
      };
    };

    loadGoogleMaps();
  }, [position, onMapLoad]);

  useEffect(() => {
    if (addFireMarker && map && position) {
      const markerPosition = new google.maps.LatLng(position.lat, position.lng);
      const marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0,
        },
        label: {
          text: "💸",
          fontSize: "48px",
          className: "marker-label animate-marker-glow-once",
        },
        optimized: false,
      });
    }
  }, [addFireMarker, map, position]);

  useEffect(() => {
    if (map && position && isPanelOpen !== undefined) {
      currentPosition.current = position;
      google.maps.event.trigger(map, "resize");

      const screenHeight = window.innerHeight;
      const panelHeight = screenHeight * 0.5;
      const latOffset = isPanelOpen ? (panelHeight / screenHeight) * 0.008 : 0;

      const center = new google.maps.LatLng(
        position.lat + latOffset,
        position.lng
      );

      map.panTo(center);
      map.setZoom(isPanelOpen ? 15.5 : 15);
    }
  }, [map, position, isPanelOpen]);

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className={`w-full h-full ${className}`}
        style={{
          minHeight: isPanelOpen ? "50vh" : "100vh",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default Map;
