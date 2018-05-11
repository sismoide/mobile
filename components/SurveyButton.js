import React, { Component } from 'react';
import { Alert, Button } from 'react-native';

import Synchronizer from '../synchronizer';
import Storage from '../database/storage.js';
import Config from '../config/index.js';

const PENDING_SURVEY = '@PendingSurvey';

export default class SurveyButton extends Component{
  _onPress = () => {
    this.props.navigation.navigate('Survey');
  }
  
  render() {
    return (
      <Button
        onPress={this._onPress}
        title={'Encuesta'}
        color='#ff8000'
      />
    )
  }
}
