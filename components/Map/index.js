import React from  'react';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import FullScreenSpinner from '../Generic/full_screen_spinner.js';
import baseNavigationOptions from '../../styles/navigation_options.js';
import getUserPosition from '../../actions/geolocation/get_user_position.js';

/**
 * This component contains a map that displays relevant information
 * with respect to earthquakes in the vicinity of the user's location
 */
class Map extends React.Component {
  componentDidMount() {
    this.props.getUserPosition();
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const {
      userPosition,
      fetchingUserPosition
    } = this.props;
    if (fetchingUserPosition || !userPosition) {
      // TODO: Should display an error if it's the case that !fetchingUserPositon && !userPosition
      // because it means that the user's location could not be determined.
      return (<FullScreenSpinner />);
    } 
    return(
      <MapView
        style={{ height, width }}
        initialRegion={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922 / 4,
          longitudeDelta: 0.0421 / 4,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingUserPosition: state.geolocation.fetchingUserPosition,
  userPosition: state.geolocation.userPosition
});

const mapActionsToProps = { getUserPosition };

export default connect(mapStateToProps, mapActionsToProps)(Map);
