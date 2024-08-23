import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import Tracking from "./g-map";

const MapTracking = () => {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyDpb3E0DazmzFWmuybM77oi-Lm_C9Jal2k",
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Tracking />;
};

export default MapTracking;
