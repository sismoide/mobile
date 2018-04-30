import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Survey from './components/Survey';

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
