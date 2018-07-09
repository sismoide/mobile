import React from 'react';
import { NetInfo, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { MKSpinner } from 'react-native-material-kit';

import fetchLastQuakeSubmissionDate from '../../actions/home/fetch_last_quake_submission_date.js';
import userPositionActions from '../../actions/geolocation/user_position.js';
import authenticate from '../../actions/authentication/authenticate.js';
import onConnectionStatusChanged from '../../actions/synchronizer/on_connection_status_changed.js';

import navigationOptions from '../../styles/navigation_options.js';

import Survey from '../Survey';
import SurveyButton from './SurveyButton.js';
import QuakeButton from './QuakeButton.js';
import FullScreenLoadingOverlay from '../Generic/full_screen_loading_overlay.js';


class Home extends React.Component {
  static navigationOptions = navigationOptions;

  componentDidMount = () => {
    NetInfo.addEventListener('connectionChange', this.props.onConnectionStatusChanged);
    this.props.fetchLastQuakeSubmissionDate();
    if (!this.props.userPosition && !this.props.fetchingUserPosition) {
      this.props.getUserPosition();
    }
    // subscribe to constantly receive user position updates regardless of anything
    // this.props.watchUserPosition(); 
    this.props.authenticate();
  }

  render() {
    const { 
      fetchingUserPosition,
      lastQuakeSubmissionDate 
    } = this.props;
    return(
      <View style={styles.container}>
        {/* pass navigation so that QuakeButton can handle navigation
            itself */}
        <Text style={ { padding: 15, fontWeight: 'bold', fontSize: 18 } }>Sentiste un sismo? Aprieta el botón!</Text>
        <QuakeButton navigation={ this.props.navigation }/>
        <SurveyButton navigation={ this.props.navigation }/>
        { fetchingUserPosition
          && <FullScreenLoadingOverlay />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => ({
  lastQuakeSubmissionDate: state.home.lastQuakeSubmissionDate,
  fetchingUserPosition: state.geolocation.fetchingUserPosition
})

const mapActionsToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  fetchLastQuakeSubmissionDate: () => dispatch(fetchLastQuakeSubmissionDate()),
  getUserPosition: userPositionActions(dispatch).get,
  watchUserPosition: userPositionActions(dispatch).watch,
  onConnectionStatusChanged: (newConnectionStatus) => { 
    dispatch(onConnectionStatusChanged(newConnectionStatus))
  }
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
