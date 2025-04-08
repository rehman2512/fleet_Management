  import React, { useEffect, useState } from "react";
  import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    InfoWindow,
    Polyline,

  } from "@react-google-maps/api";
  import Car from "../../Images/car.png";
  import { FaCarSide } from "react-icons/fa";
  import {  Steps, Input, Button, Tag } from 'antd';
  import { RiShareForwardFill } from "react-icons/ri";
  import Place from '../../Images/place.jpg'
  import { FaRegCheckCircle } from "react-icons/fa";
  import Video from '../../components/Video/video'
  import WebcamStream from '../../components/Video/WebcamStream'
  import WebRTCStream from "../../components/Video/WebRTCStream";





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
    // const [showSteps, setShowSteps] = useState(false);
    const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
    const [routePath, setRoutePath] = useState<{ lat: number; lng: number }[]>([]);
    const [tripDestination, setTripDestination] = useState<Location | null>(null);


    const vehicleData = [
      {
        id: "CR 1357",
        status: "In Transit",
        steps: [
          { title: "Started", description: "17, May, 24 - 10:00 AM" },
          { title: "Ongoing", description: "17, May, 24 - 1:30 PM" },
        ],
        location: { id: "driver1", lat: 24.8607, lng: 67.0011, name: "Driver 1" },
      },
      {
        id: "CR 2535",
        status: "Arrived",
        steps: [
          { title: "Started", description: "16, May, 24 - 8:00 AM" },
          { title: "Finished", description: "16, May, 24 - 3:00 PM" },
        ],
        location: { id: "driver2", lat: 24.8607, lng: 67.0011, name: "Driver 2" },
      },
      {
        id: "CR 2536",
        status: "Arrived",
        steps: [
          { title: "Started", description: "16, May, 24 - 8:00 AM" },
          { title: "Finished", description: "16, May, 24 - 3:00 PM" },
        ],
        location: { id: "driver3", lat: 24.8607, lng: 67.0011, name: "Driver 3" },
      },
      {
        id: "CR 2537",
        status: "Arrived",
        steps: [
          { title: "Started", description: "16, May, 24 - 8:00 AM" },
          { title: "Finished", description: "16, May, 24 - 3:00 PM" },
        ],
        location: { id: "driver4", lat: 24.8607, lng: 67.0011, name: "Driver 4" },
      },
      {
        id: "CR 2538",
        status: "Arrived",
        steps: [
          { title: "Started", description: "16, May, 24 - 8:00 AM" },
          { title: "Finished", description: "16, May, 24 - 3:00 PM" },
        ],
        location: { id: "driver5", lat: 24.8607, lng: 67.0011, name: "Driver 5" },
      },

    ];


    const toggleSteps = (vehicleId: string) => {
      setExpandedVehicle((prev) => (prev === vehicleId ? null : vehicleId));
    };

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


    const getDirections = (destination: Location) => {

      if (!isLoaded) return;
      
      const directionsService = new google.maps.DirectionsService();
      
      const origin = { lat: 24.8607, lng: 67.0011 };
      const destinationLatLng = { lat: destination.lat, lng: destination.lng };
      
      directionsService.route(
        {
          origin,
          destination: destinationLatLng,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
            const path = result.routes[0].overview_path.map((point) => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
            console.log(path, 'path')
            setRoutePath(path);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    };




    if (!isLoaded) {
      return <div>Loading Google Maps...</div>;
    }
    const mapStyles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5" // Light gray background
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off" // Hides default map icons
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161" // Medium gray for text labels
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5" // Matches background for seamless text integration
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd" // Light gray parcel boundaries
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff" // White roads
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e0e0e0" // Slightly darker for arterial roads
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada", // Light gray highways
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            // "color": "#ffffff", // White for local roads
            "visibility": "off",
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee" // Soft gray for Points of Interest
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#d4e4f4" // Soft blue water
          }
        ]
      }
    ];

    const HandleLocations = () => {
      locations.map((loc)=>(
        getDirections(loc)
      ))
    }

    
    
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={{
            styles: mapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          center={{ lat: 24.8607, lng: 67.0011 }}
          zoom={17}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={{ lat: loc.lat, lng: loc.lng }}
              title={loc.name}
              icon={{
                url: Car,
                scaledSize: new google.maps.Size(30, 30),
              }}
              onClick={() => {
                setSelectedLocation(loc);
                getDirections(loc);
              }}
            />
          ))}

          <div style={{ display: "flex", alignItems: "end"}}>
            <div
              style={{
                background: "white",
                position: "relative",
                marginLeft: "35px",
                marginTop: "50px",
                padding: "15px",
                borderRadius: "10px",
                width: "25vw",
                height: "80vh",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                overflowY: "scroll",
                WebkitBoxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"
              }}
            >
              <h5>Activites</h5>
              <Input placeholder="Search Vehicles" style={{ marginBottom: "10px" }} />

              {vehicleData.map((vehicle) => (
                <div key={vehicle.id} style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                    onClick={() => toggleSteps(vehicle.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          backgroundColor: "gray",
                          padding: "8px",
                          borderRadius: "50%",
                        }}
                      >
                        <FaCarSide size={24} color="black" />
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        <p style={{ fontSize: "14px", margin: "0px", fontWeight: "bold" }}>
                          {vehicle.id}
                        </p>
                        <p style={{ fontSize: "12px", margin: "0px", color: "gray" }}>
                          {vehicle.status}
                        </p>
                      </span>
                    </div>
                    <Button type="primary" icon={<RiShareForwardFill />} onClick={HandleLocations}>
                      Trip
                    </Button>
                  </div>

                  {expandedVehicle === vehicle.id && (
                    <Steps
                      progressDot
                      size="small"
                      status="finish"
                      direction="vertical"
                      current={vehicle.steps.length - 1}
                      style={{ marginTop: "10px", paddingLeft: "15px" }}
                      items={vehicle.steps}
                    />
                  )}
                </div>
              ))}


            </div>
            <div style={{ marginLeft: "20px", marginBottom: "10px", display: "flex", position:"relative" }}>
              <div style={{ width: "15vw", padding: "10px", display: "flex", background: "white", borderRadius: "10px", marginLeft: "10px" }}>
                {/* <img src={Place} width={80} height={70} style={{ borderRadius: "10px" }} alt="" />
                <div style={{ marginLeft: "10px" }}>
                  <p style={{ fontSize: "14px", margin: "0px", fontWeight: "bold" }}>test</p>
                  <p style={{ fontSize: "12px", margin: "0px" }}>test</p>
                  <Tag icon={<FaRegCheckCircle />} color="success">
                    success
                  </Tag>
                </div> */}
                <WebRTCStream />

              </div>
              <div style={{ width: "15vw", padding: "10px", display: "flex", background: "white", borderRadius: "10px", marginLeft: "10px" }}>
                {/* <img src={Place} width={80} height={70} style={{ borderRadius: "10px" }} alt="" />
                <div style={{ marginLeft: "10px" }}>
                  <p style={{ fontSize: "14px", margin: "0px", fontWeight: "bold" }}>test</p>
                  <p style={{ fontSize: "12px", margin: "0px" }}>test</p>
                  <Tag icon={<FaRegCheckCircle />} color="success">
                    success
                  </Tag>
                </div> */}
                <WebRTCStream />

              </div>
              <div style={{ width: "15vw", padding: "10px", display: "flex", background: "white", borderRadius: "10px", marginLeft: "10px" }}>
                {/* <img src={Place} width={80} height={70} style={{ borderRadius: "10px" }} alt="" />
                <div style={{ marginLeft: "10px" }}>
                  <p style={{ fontSize: "14px", margin: "0px", fontWeight: "bold" }}>test</p>
                  <p style={{ fontSize: "12px", margin: "0px" }}>test</p>
                  <Tag icon={<FaRegCheckCircle />} color="success">
                    success
                  </Tag>
                </div> */}
                <WebRTCStream />

              </div>
              <div style={{ width: "15vw", padding: "10px", display: "flex", background: "white", borderRadius: "10px", marginLeft: "10px" }}>
                {/* <img src={Place} width={80} height={70} style={{ borderRadius: "10px" }} alt="" />
                <div style={{ marginLeft: "10px" }}>
                  <p style={{ fontSize: "14px", margin: "0px", fontWeight: "bold" }}>test</p>
                  <p style={{ fontSize: "12px", margin: "0px" }}>test</p>
                  <Tag icon={<FaRegCheckCircle />} color="success">
                    success
                  </Tag>
                </div> */}
                {/* <WebcamStream /> */}
                {/* <Video src="http://202.143.119.141/rtspoverwebsocket"/> */}
                <WebRTCStream />
              </div>

            </div>
          </div>
          {routePath.length > 0 && (
            <Polyline
              path={routePath}
              options={{
                strokeColor: "black",
                strokeOpacity: 2,

                strokeWeight: 5,
              }}
            />
          )}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div style={{ padding: "10px", width: "17vw", display: "flex", flexDirection: "column",
              justifyContent: "center",  background: "white", borderRadius: "10px"
               }}>
                <span style={{fontSize:20, fontWeight:"500"}}>{selectedLocation.name}</span>
                <br />
                <span>
                    Latitude: {selectedLocation.lat.toFixed(5)}
                </span>
                <br />
                <span>
                    Longitude: {selectedLocation.lng.toFixed(5)}
                </span>
                <br />
                <span>
                    Address: {selectedLocation.address || "Fetching address..."}
                </span>
                Area: {selectedLocation.address || "Fetching address..."}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  };

  export default GPSTrackingScreen;
