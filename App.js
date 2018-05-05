import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import configureStore from './store';

import Home from './components/Home';
import Survey from './components/Survey';

const RootNavigator = StackNavigator(
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

const store = configureStore({});

export default () => ( 
  <Provider store={ store }>
    <RootNavigator />
  </Provider>
)
