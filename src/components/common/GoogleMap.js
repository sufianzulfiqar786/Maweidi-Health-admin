import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const LocationForm = ({ google, locationProp, setLocationProp}) => {
  const zoom = 12;

  const mapStyles = {
    width: '89%',
    height: '300px',
    zIndex: 30
  };

  const onMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    const geocoder = new google.maps.Geocoder();
    const location = { lat, lng };

  geocoder.geocode({ location }, (results, status) => {
    if (status === "OK") {
      if (results[0]) {
        const placeName = results[0].formatted_address;
        setLocationProp(placeName)
        console.log("Selected Location:", locationProp);
        // Perform any additional operations with the selected location here
      }
    } else {
      console.error("Geocoder failed due to:", status);
    }
  });
  };

  return (
    <div>
        <Map
          google={google}
          zoom={zoom}
          style={mapStyles}
          onClick={onMapClick}
          initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Example: San Francisco
        >
          <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
        </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAkhdWo1SX8xUPGcXbuzDHHT-gv_vUClKs',
})(LocationForm);