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
