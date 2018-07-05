import React from  'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import FullScreenSpinner from '../Generic/full_screen_spinner.js';
import FullScreenError from '../Generic/full_screen_error.js';
import UserMarker from './user_marker.js';
import NearbyQuakeMarker from './nearby_quake_marker.js';
import NearbyReportMarker from './nearby_report_marker.js';
import LandmarkMarker from './landmark_marker.js';

import baseNavigationOptions from '../../styles/navigation_options.js';
import userPositionActions from '../../actions/geolocation/user_position.js';
import fetchNearbyQuakes from '../../actions/map/fetch_nearby_quakes.js';
import fetchNearbyReports from '../../actions/map/fetch_nearby_reports.js';
import fetchNearbyLandmarks from '../../actions/map/fetch_nearby_landmarks.js';

// Will try to fetch nearby quakes every X seconds;
const FETCH_NEARBY_QUAKES_INTERVAL_MILLISECONDS = 10000;

/**
 * This component contains a map that displays relevant information
 * with respect to earthquakes in the vicinity of the user's location
 */
class Map extends React.Component {
  componentDidMount() {
    const {
      userPosition,
      fetchNearbyQuakes,
      fetchNearbyReports
    } = this.props;

    const fetchQuakesAndReportsIfUserLocationAvailable = () => {
      if (userPosition) {
        fetchNearbyQuakes(userPosition);
        fetchNearbyReports(userPosition);
      }
    }

    fetchQuakesAndReportsIfUserLocationAvailable();
    this.nearbyQuakesFetcherInterval = setInterval(() => {
     fetchQuakesAndReportsIfUserLocationAvailable 
    }, FETCH_NEARBY_QUAKES_INTERVAL_MILLISECONDS);
  }

  componentWillUnmount() {
    clearInterval(this.nearbyQuakesFetcherInterval);
  }

  componentDidUpdate() {
    const {
      userPosition,
      fetchNearbyLandmarks,
      nearbyLandmarks,
      receivedLandmarksFromServer,
    } = this.props;
    if (userPosition && !receivedLandmarksFromServer) {
      // If we have access to the user's location
      // but the landmarks haven't been loaded yet, then do it.
      fetchNearbyLandmarks(userPosition);
    }
  }

  render() {
    const {
      userPosition,
      fetchingUserPosition,
      nearbyQuakes,
      nearbyReports,
      nearbyLandmarks,
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
        region={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922 / 4,
          longitudeDelta: 0.0421 / 4,
        }}>
        <UserMarker coordinate={ userPosition } />
        { 
          nearbyQuakes.map(
          (nearbyQuake, index) => 
            <NearbyQuakeMarker 
              key={ index }
              quake={ nearbyQuake }/>
          ) 
        }
        {
          nearbyReports.map(
            (nearbyReport, index) =>
              <NearbyReportMarker
                key={ index }
                report={ nearbyReport }/>
          )
        }
        {
          nearbyLandmarks.map(
            (nearbyLandmark, index) =>
              <LandmarkMarker
                key={ index }
                landmark={ nearbyLandmark } />
          )
        }
      </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingUserPosition: state.geolocation.fetchingUserPosition,
  userPosition: state.geolocation.userPosition,
  nearbyQuakes: state.map.quakes,
  nearbyReports: state.map.reports,
  nearbyLandmarks: state.map.landmarks,
  receivedLandmarksFromServer: state.map.receivedLandmarksFromServer
});

const mapActionsToProps = {
  fetchNearbyQuakes,
  fetchNearbyReports,
  fetchNearbyLandmarks,
}

export default connect(mapStateToProps, mapActionsToProps)(Map);
