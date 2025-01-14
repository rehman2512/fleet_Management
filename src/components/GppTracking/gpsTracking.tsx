import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Car from "../../Images/car.png";

const customIcon = new L.Icon({
  iconUrl: Car,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
});

interface Location {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

const GPSTrackingScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateCurrentUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentUserLocation: Location = {
              id: "current_user",
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              name: "You (Current User)",
            };

            setLocations((prevLocations) => {
              // Replace current user's location or add it if not present
              const otherUsers = prevLocations.filter((loc) => loc.id !== "current_user");
              return [currentUserLocation, ...otherUsers];
            });
            setError(null);
          },
          (err) => {
            setError("Unable to retrieve your location. Make sure GPS is enabled.");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    const simulateOtherUsers = () => {
      const mockedLocations: Location[] = [
        { id: "1", lat: 37.7749, lng: -122.4194, name: "User 1" }, // Example: San Francisco
        { id: "2", lat: 34.0522, lng: -118.2437, name: "User 2" }, // Example: Los Angeles
        { id: "3", lat: 40.7128, lng: -74.006, name: "User 3" }, // Example: New York
      ];

      setLocations((prevLocations) => {
        const currentUser = prevLocations.find((loc) => loc.id === "current_user");
        return currentUser ? [currentUser, ...mockedLocations] : mockedLocations;
      });
    };

    // Update current user location and simulate others every 10 seconds
    updateCurrentUserLocation();
    const intervalId = setInterval(() => {
      updateCurrentUserLocation();
      simulateOtherUsers();
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {locations.length > 0 ? (
        <MapContainer
          center={[locations[0].lat, locations[0].lng]} // Center on the first user's location
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
              <Popup>
                <strong>{loc.name}</strong> <br />
                Latitude: {loc.lat.toFixed(5)}, Longitude: {loc.lng.toFixed(5)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <p>Fetching locations...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GPSTrackingScreen;
