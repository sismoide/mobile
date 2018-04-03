import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Survey from './components/Survey.js';
import QuakeButton from './components/QuakeButton.js';

import BaseStyle from './styles/base.js';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Sismoide',
    headerStyle: {
      backgroundColor: BaseStyle.colors.secondaryBackgroundColor
    },
    headerTintColor: BaseStyle.colors.secondaryTextColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.container}>
        {/* pass navigation so that QuakeButton can handle navigation
            itself */}
        <QuakeButton navigation={ this.props.navigation }/>
      </View>
    );
  }
}

export default StackNavigator(
  {
    Home: {
      screen: Home
    },
    Survey: {
      screen: Survey 
    },
  },
  {
    initialRouteName: 'Home'
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
