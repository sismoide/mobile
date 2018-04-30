import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';

import Synchronizer from "./Synchronizer.js"
import Storage from "../database/storage.js"
import Config from '../config/index.js';

export default class QuakeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingPosition: false
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
      <Button
        enabled={ !this.state.fetchingPosition }
        onPress={ this._onPress }
        title={ this.state.fetchingPosition ? "Cargando..." : "Temblor?" }
        color="#ff0000"
      />
    );
  }
}
