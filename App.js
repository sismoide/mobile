import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import configureStore from './store';

import Home from './components/Home';
import Survey from './components/Survey';
import Map from './components/Map';

const HomeAndSurveyNavigator = createStackNavigator(
  {
    Home,
    Survey
  },
  {
    initialRouteName: 'Home'
  }
);

const RootNavigator = createBottomTabNavigator(
  {
    Home: { 
      screen: HomeAndSurveyNavigator,
      navigationOptions: {
        title: 'Inicio',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='exclamation-circle'
            size={ 26 }
            style={{ color: (focused ? 'red' : tintColor ) }}
          />
        ),
      }
    },
    Map: {
      screen: Map,
      navigationOptions: {
        title: 'Mapa',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='globe'
            size={ 26 }
            style={{ color: (focused ? 'orange' : tintColor ) }}
          />
        ),
      },
    }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false
    }
  }
)

const store = configureStore({});

export default () => ( 
  <Provider store={ store }>
    <RootNavigator />
  </Provider>
)
