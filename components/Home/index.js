import React from 'react';
import moment from 'moment-timezone';
import { StyleSheet, Text, View } from 'react-native';

import Survey from '../Survey';
import QuakeButton from '../QuakeButton.js';
import Storage from '../../database/storage.js';
import Config from '../../config';
import navigationOptions from '../../styles/navigation_options.js';

export default class Home extends React.Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);
    /* Start fetching the latest quake submission. Show `...` in the meantime */
    this.state = {
      lastQuakeSubmission: "..."
    }
    this.getLatestQuakeSubmissionDate()
      .then((date) => {
        console.log(date);
        this.setState({ lastQuakeSubmission: date });
      });
  }

  /**
   * @returns { String } A formatted, locale aware date string of 
   * the last time a quake was submitted.
   */
  getLatestQuakeSubmissionDate = async () => {
    const latestTimestamp = await Storage.getLatestQuakeSubmissionTimestamp();
    if (latestTimestamp) {
      return moment(latestTimestamp)
        .tz(Config.LOCALE)
        .calendar()
        .toLocaleString();
    } else {
      return "nunca"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
