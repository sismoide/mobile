import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import { connect } from 'react-redux';

import Synchronizer from '../../synchronizer';
import Storage from '../../database/storage.js';
import Config from '../../config/index.js';

import onQuakeReport from '../../actions/home/on_quake_report.js';

class QuakeButton extends Component {
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

const mapActionsToProps = (dispatch) => ({
  onQuakeReport,
});

export default connect(mapStateToProps, mapActionsToProps)(QuakeButton);
