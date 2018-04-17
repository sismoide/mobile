import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';
import Config from '../assets/config.js'
import Storage from '../database/storage.js';

// Button Element
export default class QuakeButton extends Component {
  constructor(props) {
    super(props);
    /* make `this` available to `onPressQuake` */
    this._onPressButtonQuake = this._onPressButtonQuake.bind(this);
  }

  _onPressButtonQuake() {
    if (navigator.geolocation) {
      // check if geolocation is available
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latitudeAndLongitude = {
            latitude: `${pos.coords.latitude.toFixed(6)}`,
            longitude: `${pos.coords.longitude.toFixed(6)}`
          }
          fetch(Config.SERVER_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coordinates: latitudeAndLongitude,
              timestamp: `${Date.now()}`
            }),
          });
          this.props.navigation.navigate('Survey');
        },
        (error) => alert(error.message),
        {}
      );
    } else {
      alert('La geolocalización está deshabilitada. Esta acción no está disponible.');
    }
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
