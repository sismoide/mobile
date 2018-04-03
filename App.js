import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';

// Button Element
class QuakeButton extends Component {
  _onPressButtonQuake() {
    console.log('Pressed seism button');
    Alert.alert(
      'Temblor!',
	    'Se ha notificado un temblor!',
	    // change to give option to answer poll
	    [{text: 'OK', onPress: () => console.log('Pressed OK')}] 
	  )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButtonQuake}
            title="Temblor?"
            color="#ff0000"
          />
        </View>
      </View>
    );
  }
}

export default class HomePage extends Component {
  render() {
    return (
      <QuakeButton/>
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