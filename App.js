import React from 'react';
import { Alert, StyleSheet, Text, View, Button, NetInfo, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Survey from './components/Survey/Survey.js';
import QuakeButton from './components/QuakeButton.js';
import BaseStyle from './styles/base.js';
import navigationOptions from './styles/navigation_options.js';

class Home extends React.Component {  
  static navigationOptions = navigationOptions;

  handleConnectionChange(connectionInfo) {
    if (connectionInfo.type != 'none') {    
			const quakeReport = AsyncStorage.getItem('quakeReport');
			const survey = AsyncStorage.getItem('survey');
			if (quakeReport != null) {
				try{
					fetch(Config.SERVER_URL, quakeReport);
				} catch (error) {
					//error 
				}
				AsyncStorage.removeItem('quakeReport');
			}
			if (survey != null) {
				try{
					fetch(Config.SERVER_URL, survey);
				} catch (error) {
					//error 
				}
				AsyncStorage.removeItem('survey');
			}
    }
  };

  componentDidMount = () => NetInfo.addEventListener('connectionChange', this.handleConnectionChange);

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
