import React from  'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import hospitalIcon from '../../assets/hospital_marker.png';
import waterSourceIcon from '../../assets/water_source_marker.jpg'; // png?
import gasStationIcon from '../../assets/gas_station_marker.png';
import sapuIcon from '../../assets/sapu_marker.png';


export default function LandmarkMarker({ landmark }) {
  const LandmarkMarker = mapLandmarkTypeToMarkerComponent[landmark.type];
  return(
    <LandmarkMarker
      name={ landmark.name }
      coordinates={ landmark.coordinates } />
  );
}

const mapLandmarkTypeToMarkerComponent = {
  hospital: HospitalMarker,
  waterSource: WaterSourceMarker,
  gasStation: GasStationMarker,
  SAPU: SAPUMarker,
};

function HospitalMarker({ name, coordinates }) {
  return(
    <MapView.Marker
      title={ 'Hospital' }
      description={ name }
      image={ hospitalIcon }
      coordinate={ coordinates }
    >
    </MapView.Marker>
  );
}

function WaterSourceMarker({ name, coordinates }) {
  return(
    <MapView.Marker
      title={ 'Fuente de Agua' }
      description={ name }
      image={ waterSourceIcon }
      coordinate={ coordinates }
    >
    </MapView.Marker>
  );
}

function GasStationMarker({ name, coordinates }) {
  return(
    <MapView.Marker
      title={ 'Bencinera' }
      description={ name }
      image={ gasStationIcon }
      coordinate={ coordinates }
    >
    </MapView.Marker>
  );
}

function SAPUMarker({ name, coordinates }) {
  return(
    <MapView.Marker
      title={ 'SAPU' }
      description={ name }
      image={ sapuIcon }
      coordinate={ coordinates }
    >
    </MapView.Marker>
  );
}
