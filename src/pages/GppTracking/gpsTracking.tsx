import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import Car from "../../Images/car.png";

interface Location {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address?: string; 
}

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 60px)",
};

const GPSTrackingScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCc_o9yDDt17I4tZSJuel14WFB3YoKsH3M",
  });

  useEffect(() => {
    const fetchAddress = async (lat: number, lng: number): Promise<string> => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCc_o9yDDt17I4tZSJuel14WFB3YoKsH3M`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return "Unknown area";
    };

    const simulateOtherUsers = async () => {
      const mockedLocations: Location[] = [
        { id: "driver1", lat: 24.8607, lng: 67.0011, name: "Driver 1" },
        { id: "driver2", lat: 24.8617, lng: 67.0051, name: "Driver 2" },
        { id: "driver3", lat: 24.8590, lng: 67.0075, name: "Driver 3" },
        { id: "driver4", lat: 24.8570, lng: 67.0030, name: "Driver 4" },
        { id: "driver5", lat: 24.8650, lng: 67.0080, name: "Driver 5" },
      ];

      // Fetch address for each driver
      const locationsWithAddress = await Promise.all(
        mockedLocations.map(async (loc) => {
          const address = await fetchAddress(loc.lat, loc.lng);
          return { ...loc, address };
        })
      );

      setLocations(locationsWithAddress);
    };

    simulateOtherUsers();
  }, []);

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 24.8607, lng: 67.0011 }}
        zoom={14}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.lat, lng: loc.lng }}
            icon={{
              url: Car,
              scaledSize: new google.maps.Size(30, 30),
            }}
            onClick={() => setSelectedLocation(loc)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <strong>{selectedLocation.name}</strong>
              <br />
              Latitude: {selectedLocation.lat.toFixed(5)}
              <br />
              Longitude: {selectedLocation.lng.toFixed(5)}
              <br />
              Area: {selectedLocation.address || "Fetching address..."}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default GPSTrackingScreen;
