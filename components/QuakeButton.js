import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, NetInfo, AsyncStorage } from 'react-native';
import Config from '../assets/config.js';

function button_success(pos) {
	const crd = pos.coords;
	const quake = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			coordinates: {
				latitude: `${crd.latitude}`,
				longitude: `${crd.longitude}`
			},
			timestamp: `${new Date(Date.now()).toISOString()}`
		}),
	};
	
	NetInfo.getConnectionInfo().then((connectionInfo) => {
		if (connectionInfo.type == 'none') {
		  try {	AsyncStorage.setItem('quake', JSON.stringify(quake)) }
		  catch (error) {  }
		} else {
			try{ fetch(Config.SERVER_URL, quake) }
			catch (error) {  }
		}
	});
}

// Button Element
export default class QuakeButton extends React.Component {
  constructor(props) {
    super(props);
    {/* make `this` available to `onPressQuake` */}
    this._onPressButtonQuake = this._onPressButtonQuake.bind(this);
  }

  _onPressButtonQuake() {    
    // Getting location and timestamp, creating request
    navigator.geolocation.getCurrentPosition(
			button_success,
			(error) => console.log(error.message),
			{}
    );
    
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
