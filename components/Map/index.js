import React from  'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import FullScreenSpinner from '../Generic/full_screen_spinner.js';
import FullScreenError from '../Generic/full_screen_error.js';
import UserMarker from './user_marker.js';

import baseNavigationOptions from '../../styles/navigation_options.js';
import userPositionActions from '../../actions/geolocation/user_position.js';

/**
 * This component contains a map that displays relevant information
 * with respect to earthquakes in the vicinity of the user's location
 */
class Map extends React.Component {
  render() {
    const {
      userPosition,
      fetchingUserPosition
    } = this.props;
    if (fetchingUserPosition) {
      return (<FullScreenSpinner />);
    }
    if (!fetchingUserPosition && !userPosition) {
      // If it's not trying to load a location, and there's no valid location,
      // then something bad happened.
      return (<FullScreenError message="Tuvimos un problema determinando tu ubicación. Nos diste permiso para acceder?" />);
    }
    // From here on, we got a valid, up-to-date user location.
    return(
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922 / 4,
          longitudeDelta: 0.0421 / 4,
        }}>
        <UserMarker coordinate={ userPosition } />
      </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingUserPosition: state.geolocation.fetchingUserPosition,
  userPosition: state.geolocation.userPosition
});

export default connect(mapStateToProps)(Map);
