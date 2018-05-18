import React from 'react';
import { Alert, NetInfo, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Survey from '../Survey';
import Synchronizer from '../../synchronizer';
import QuakeButton from '../QuakeButton.js';
import SurveyButton from '../SurveyButton.js';
import fetchLastQuakeSubmissionDate from '../../actions/home/fetch_last_quake_submission_date.js';
import navigationOptions from '../../styles/navigation_options.js';

import Storage from '../../database/storage.js';

class Home extends React.Component {
  static navigationOptions = navigationOptions;

  componentDidMount = () => {
    Storage.clearQuakeReports();
    Storage.clearIntensities();
    NetInfo.addEventListener('connectionChange', Synchronizer.connectionHandler)
    this.props.fetchLastQuakeSubmissionDate();
  }

  render() {
    const { lastQuakeSubmissionDate } = this.props;
    return(
      <View style={styles.container}>
        {/* pass navigation so that QuakeButton can handle navigation
            itself */}
        <Text style={ { padding: 15, fontWeight: 'bold', fontSize: 18 } }>Sentiste un sismo? Aprieta el botón!</Text>
        <QuakeButton navigation={ this.props.navigation }/>
        <Text style={ { padding: 15 } }>La última vez que reportaste un sismo fue: { lastQuakeSubmissionDate }</Text>
		<SurveyButton navigation={ this.props.navigation }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => ({
  lastQuakeSubmissionDate: state.home.lastQuakeSubmissionDate
})

const mapActionsToProps = {
  fetchLastQuakeSubmissionDate
};

export default connect(mapStateToProps, mapActionsToProps)(Home);

