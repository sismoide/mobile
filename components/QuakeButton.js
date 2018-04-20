import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';
import Sync from "./Synchronizer.js"
import Storage from "../database/Storage.js"
import Config from '../config';

// Button Element
export default class QuakeButton extends Component {
  _onPressButtonQuake = async ()  => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {  }
			);
			await Storage.submitQuakeReport({
				latitude: '20',
				longitude: '30'
			});
			Sync.onDataChange();
			/*let quakeReports = await Storage.getQuakeReports();
			console.log(quakeReports);
			await Storage.submitLatestQuakeIntensity(8);
			let intensities = await Storage.getIntensities();
			console.log(intensities);*/
		} else {
			Alert.alert("Geolocalización desactivada. Función no Disponible");
		}
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
