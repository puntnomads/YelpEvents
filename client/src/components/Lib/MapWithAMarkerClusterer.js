import React from "react";

import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env
      .REACT_APP_GOOGLE_MAP_API_KEY ||
      ""}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const bounds = new window.google.maps.LatLngBounds();
  const coordinates = props.markers.map(marker => {
    const { latitude, longitude } = marker;
    const latLng = new window.google.maps.LatLng(latitude, longitude);
    bounds.extend(latLng);
    return latLng;
  });
  return (
    <GoogleMap
      ref={map => map && map.fitBounds(bounds)}
      defaultZoom={13}
      defaultCenter={{
        lat: props.markers[0].latitude,
        lng: props.markers[0].longitude
      }}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </GoogleMap>
  );
});

export default MapWithAMarkerClusterer;
