import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default function UserMarker(props) {
  return(
    <MapView.Marker
      coordinate={ props.coordinate }>
      <View style={ styles.userMarker }>
      </View>
    </MapView.Marker>
  );
}

const styles = StyleSheet.create({
  userMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});
