import React from 'react';
import MapView from 'react-native-maps';
import icon from '../../assets/report_marker.png';

export default function NearbyReportMarker({ report }) {
  return(
    <MapView.Marker
      title={ 'Reporte de usuario' }
      description={ `${ report.intensity } Mercalli` }
      image={ icon }
      coordinate={ report.coordinates }>
    </MapView.Marker>
  );
}
