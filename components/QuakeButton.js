import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';

// Button Element
export default class QuakeButton extends Component {
  constructor(props) {
    super(props);
    {/* make `this` available to `onPressQuake` */}
    this._onPressButtonQuake = this._onPressButtonQuake.bind(this);
  }

  _onPressButtonQuake() {
  
    // Getting location and timestamp,sending it to server
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        fetch('http://10.190.54.186:8000/reports/', {
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
