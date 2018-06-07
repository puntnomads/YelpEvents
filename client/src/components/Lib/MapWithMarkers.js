import React from "react";

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import averageGeolocation from "../Lib/averageGeolocation";

type Props = {
  markers: Array<{
    id: number,
    latitude: number,
    longitude: number
  }>,
  zoomToMarker: number
};

const MapWithMarkers = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env
      .REACT_APP_GOOGLE_MAP_API_KEY ||
      ""}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props: Props) => {
  let zoomToMarker = props.zoomToMarker;
  let markers = props.markers;
  let zoom = 12;
  const averageLocation = averageGeolocation(markers);
  let lat = averageLocation.latitude;
  let lng = averageLocation.longitude;
  if (zoomToMarker > -1) {
    lat = markers[zoomToMarker].latitude;
    lng = markers[zoomToMarker].longitude;
    zoom = 18;
  }
  return (
    <GoogleMap
      zoom={zoom}
      center={{
        lat: lat,
        lng: lng
      }}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </GoogleMap>
  );
});

export default MapWithMarkers;
