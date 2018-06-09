import React from 'react';
import MapView from 'react-native-maps';

export default function NearbyQuakeMarker({ position }) {
  return(
    <MapView.Marker
      coordinate={ position }>
    </MapView.Marker>
  );
}
