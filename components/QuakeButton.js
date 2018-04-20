import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';
import Sync from "./Synchronizer.js"
import Storage from "../database/Storage.js"
import Config from '../config/index.js';

// Button Element
export default class QuakeButton extends Component {
  _onPressButtonQuake = async ()  => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
				  Storage.submitQuakeReport({
					latitude: `${ pos.coords.latitude }`,
					longitude: `${ pos.coords.longitude }`
				  }).then(() => { Sync.onDataChange() })
				}
			);
		} else {
			Alert.alert("Geolocalización desactivada. Función no Disponible");
		}
    // advancing to survey
    this.props.navigation.navigate('Survey');
  }
  
  render() {
    return (
      <Button
        onPress={ this._onPressButtonQuake }
        title="Temblor?"
        color="#ff0000"
      />
    );
  }
}
