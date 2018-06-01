import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import { connect } from 'react-redux';

import Synchronizer from '../../synchronizer';
import Storage from '../../database/storage.js';
import Config from '../../config/index.js';

import onQuakeReport from '../../actions/home/on_quake_report.js';
import getUserPosition from '../../actions/geolocation/get_user_position.js';

class QuakeButton extends Component {
  componentDidMount() {
    // If somebody else hasn't done it yet, start fetching the user's location.
    if (!this.props.userPosition && !this.props.fetchingUserPosition) {
      this.props.getUserPosition();
    }
  }

  render() {
    const {
      userPosition,
      onQuakeReport,
      navigation 
    } = this.props;
    return (
      <View>
        <TouchableHighlight
          disabled={ !userPosition 
          /* Just for safety. Shouldn't be available due to the overlay anyways. */ 
          }
          onPress={ () => onQuakeReport(userPosition, navigation) }
          underlayColor={ 'transparent' }
        >
          <Image
            source={ require('../../assets/red_button.png') }
            style={{ width:275, height:275 }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userPosition: state.geolocation.userPosition,
  fetchingUserPosition: state.geolocation.fetchingUserPosition
})

const mapActionsToProps = {
  onQuakeReport,
  getUserPosition
};

export default connect(mapStateToProps, mapActionsToProps)(QuakeButton);
