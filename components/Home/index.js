import React from 'react';
import { NetInfo, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Survey from '../Survey';
import Synchronizer from '../../synchronizer';
import QuakeButton from '../QuakeButton.js';
import fetchLastQuakeSubmissionDate from '../../actions/home/fetch_last_quake_submission_date.js';
import navigationOptions from '../../styles/navigation_options.js';

class Home extends React.Component {
  static navigationOptions = navigationOptions;

  componentDidMount = () => { 
    NetInfo.addEventListener('connectionChange', Synchronizer.connectionHandler)
    this.props.fetchLastQuakeSubmissionDate();
  }

  render() {
    const { lastQuakeSubmissionDate } = this.props;
    return(
      <View style={styles.container}>
        {/* pass navigation so that QuakeButton can handle navigation
            itself */}
        <QuakeButton navigation={ this.props.navigation }/>
        <Text style={ { padding: 40 } }>La última vez que reportaste un sismo fue: 
          { lastQuakeSubmissionDate }</Text>
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

const mapStateToProps = (state) => ({
  lastQuakeSubmissionDate: state.home.lastQuakeSubmissionDate
})

const mapActionsToProps = {
  fetchLastQuakeSubmissionDate
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
