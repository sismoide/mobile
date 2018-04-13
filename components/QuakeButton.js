import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, NetInfo, AsyncStorage } from 'react-native';
import Config from '../assets/config.js'

// Button Element
export default class QuakeButton extends Component {
  constructor(props) {
    super(props);
    {/* make `this` available to `onPressQuake` */}
    this._onPressButtonQuake = this._onPressButtonQuake.bind(this);
  }

  _onPressButtonQuake() {
    var request = {};
    
    // Getting location and timestamp
    navigator.geolocation.getCurrentPosition(
			(pos) => {
				const crd = pos.coords;
				request = {
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
				}
			},
			(error) => console.log(error.message),
			{}
    );
    
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type == 'none') {
        try {
          AsyncStorage.setItem('report',JSON.stringify(request));
				} catch (error) {
					// Error saving data
				}
      } else {
        console.log("sent");
        fetch(Config.SERVER_URL, request);
      }
    });
    
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
