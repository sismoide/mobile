import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, NetInfo, AsyncStorage } from 'react-native';
import Sync from "./Synchronizer.js"
import Storage from "../database/Storage.js"

// Button Element
export default class QuakeButton extends React.Component {
  constructor(props) {
    super(props);
    {/* make `this` available to `onPressQuake` */}
    this._onPressButtonQuake = this._onPressButtonQuake.bind(this);
  }

  async _onPressButtonQuake() {
	
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
    
    // advancing to survey
    this.props.navigation.navigate('Survey');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={ this._onPressButtonQuake }
            title="Temblor?"
            color="#ff0000"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  }
})
