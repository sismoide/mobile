import React from 'react';
import MapView from 'react-native-maps';
import icon from '../../assets/report_marker.png';

export default function NearbyReportMarker({ report }) {
  let markerDescription;
  if (report.intensity) {
    markerDescription = `${ report.intensity } Mercalli`;
  } else {
    markerDescription = 'Intensidad desconocida';
  }
  return(
    <MapView.Marker
      title={ 'Reporte de usuario' }
      description={ markerDescription }
      image={ icon }
      coordinate={ report.coordinates }>
    </MapView.Marker>
  );
}
