import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import configureStore from './store';

import Home from './components/Home';
import Survey from './components/Survey';
import Map from './components/Map';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Survey: {
      screen: Survey
    },
    Map: {
      screen: Map
    }
  },
  {
    initialRouteName: 'Map'
  }
);

const store = configureStore({});

export default () => ( 
  <Provider store={ store }>
    <RootNavigator />
  </Provider>
)
