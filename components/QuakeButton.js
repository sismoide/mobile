import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';
import Config from '../assets/config.js'

// Button Element
export default class QuakeButton extends Component {
  _onPressButtonQuake = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        fetch(Config.SERVER_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: {
              latitude: `${crd.latitude.toFixed(6)}`,
              longitude: `${crd.longitude.toFixed(6)}`
            },
            timestamp: `${Date.now()}`
          }),
        });
      },
      (error) => alert(error.message),
      {}
    );
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
