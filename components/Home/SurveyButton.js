import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import Storage from '../../database/storage.js';
import Config from '../../config/index.js';

class SurveyButton extends Component{
  render() {
    return (
      <Button
        onPress={ () => this.props.navigation.navigate('Survey') }
        disabled={ !this.props.surveyButtonAvailable }
        title={'Calcula la intensidad del sismo'}
        color='#ff8000'
      />
    )
  }
}

const mapStateToProps = (state) => ({
  surveyButtonAvailable: state.home.surveyButtonAvailable,
});

export default connect(mapStateToProps)(SurveyButton);
