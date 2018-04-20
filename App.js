import React from 'react';
import { Alert, StyleSheet, Text, View, Button, NetInfo, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Survey from './components/Survey/Survey.js';
import QuakeButton from './components/QuakeButton.js';
import Storage from './database/storage.js';
import Config from './config';
import navigationOptions from './styles/navigation_options.js';
import Sync from "./components/Synchronizer.js"
import moment from 'moment-timezone';

class Home extends React.Component {  
  static navigationOptions = navigationOptions;
  
  componentDidMount = () => NetInfo.addEventListener('connectionChange', Sync.connectionHandler);

  constructor(props) {
    super(props);
    /* Start fetching the latest quake submission. Show `...` in the meantime */
    this.state = {
      lastQuakeSubmission: "..."
    }
    this.getLatestQuakeSubmissionDate()
      .then((date) => {
        this.setState({ lastQuakeSubmission: date });
      });
  }

  /**
   * @returns { String } A formatted, locale aware date string of 
   * the last time a quake was submitted.
   */
  getLatestQuakeSubmissionDate = async () => {
    try {
      return moment(Number(await Storage.getLatestQuakeSubmissionTimestamp()))
        .tz(Config.LOCALE)
        .calendar();
    } catch (error) {
      return "nunca";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* pass navigation so that QuakeButton can handle navigation
            itself */}
        <QuakeButton navigation={ this.props.navigation }/>
        <Text style={ { padding: 40 } }>La última vez que reportaste un sismo fue: { this.state.lastQuakeSubmission }</Text>
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
