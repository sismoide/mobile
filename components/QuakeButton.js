import React, { Component } from 'react';
import { Alert, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';

import Synchronizer from '../synchronizer';
import Storage from '../database/storage.js';
import Config from '../config/index.js';

import onQuakeReport from '../actions/buttons/on_quake_report.js';

class QuakeButton extends Component {
  render() {
    const {
      fetchingPosition,
      onQuakeReport,
      navigation } = this.props;
    const reportQuake = () => onQuakeReport(navigation);
    return (
      <TouchableHighlight
        disabled={fetchingPosition}
        onPress={reportQuake}
		underlayColor={'transparent'}
      >
        <Image
          source={require('../assets/red_button.png')}
          style={{width:300, height:300}}
        />
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingPosition: state.survey.fetchingPosition,
});

const mapActionsToProps = {
  onQuakeReport
};

export default connect(mapStateToProps, mapActionsToProps)(QuakeButton);