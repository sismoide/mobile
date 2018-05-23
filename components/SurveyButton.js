import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import Synchronizer from '../synchronizer';
import Storage from '../database/storage.js';
import Config from '../config/index.js';

class SurveyButton extends Component{
  _onPress = () => {
    this.props.navigation.navigate('Survey');
  }
  
  render() {
    const { pendingSurvey } = this.props;
    return (
      <Button
        onPress={this._onPress}
        disabled={!pendingSurvey}
        title={'Encuesta'}
        color='#ff8000'
      />
    )
  }
}

const mapStateToProps = (state) => ({
  pendingSurvey: state.buttons.pendingSurvey,
});

export default connect(mapStateToProps)(SurveyButton);