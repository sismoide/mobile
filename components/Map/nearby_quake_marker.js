import React from 'react';
import MapView from 'react-native-maps';
import icon from '../../assets/quake_marker.png';

export default function NearbyQuakeMarker({ quake }) {
  return(
    <MapView.Marker
      title={ 'Sismo' }
      description={ `${ quake.magnitude} Richter` }
      image={ icon }
      coordinate={ quake.coordinates }>
    </MapView.Marker>
  );
}
