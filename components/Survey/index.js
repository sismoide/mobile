import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, Image } from 'react-native';

import navigationOptions from '../../styles/navigation_options.js';
import SurveyQuestionModal from './SurveyQuestionModal.js';
import SurveyCompleteModal from './SurveyCompleteModal.js';


/**
 * @param {Object} - navigationOptions: original navigation options object.
 * @returns {Object} - navigation options that don't include a back button.
 */
function withoutBackButton(navigationOptions) {
  let clonedNavigationOptions = Object.assign(navigationOptions, {});
  clonedNavigationOptions.headerLeft = null;
  return clonedNavigationOptions;
}

class Survey extends Component {
  static navigationOptions = withoutBackButton(navigationOptions);

  render() {
    const { height, width } = Dimensions.get('window');
    return( 
      <View>
        <Image source={require('../../assets/map.png')} style={ { height: height, width: width } }/>
        { 
          this.props.surveyWasCompleted 
          ? <SurveyCompleteModal />
          : <SurveyQuestionModal />
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  surveyWasCompleted: state.survey.surveyResults ? true : false
});

export default connect(mapStateToProps)(Survey);
