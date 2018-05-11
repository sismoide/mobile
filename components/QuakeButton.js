import React, { Component } from 'react';
import { Alert, TouchableHighlight, Image } from 'react-native';

import Synchronizer from '../synchronizer';
import Storage from '../database/storage.js';
import Config from '../config/index.js';

const PENDING_SURVEY = '@PendingSurvey';

export default class QuakeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingPosition: false,
    }
  }

  _onPress = ()  => {
    if (!navigator.geolocation) {
      Alert.alert("Geolocalización desactivada. Función no disponible");
      return;
    }
    this.setState({ fetchingPosition: true });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await Storage.submitQuakeReport({
          latitude: `${ pos.coords.latitude }`,
          longitude: `${ pos.coords.longitude }`
        });
        Synchronizer.onDataChange();
        this.setState({ fetchingPosition: false });
        this.props.navigation.navigate('Survey');
      }
    );
  }
  
  render() {
    return (
      <TouchableHighlight
        disabled={this.state.fetchingPosition}
        onPress={this._onPress}
		underlayColor={'transparent'}
      >
        <Image
          source={require('../assets/red_button.png')}
          style={{width:300, height:300}}
        />
      </TouchableHighlight>
    );
  }
}
