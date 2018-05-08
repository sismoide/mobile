import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, Image } from 'react-native';

import onDismissSurvey from '../../actions/survey/on_dismiss_survey.js';
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
    const { 
      surveyWasCompleted,
      navigation, 
      onDismissSurvey } = this.props;
    const dismissSurvey = () => onDismissSurvey(navigation);
    return( 
      <View>
        <Image source={require('../../assets/map.png')} style={ { height: height, width: width } }/>
        { 
          surveyWasCompleted 
          ? <SurveyCompleteModal onRequestClose={ dismissSurvey }/>
          : <SurveyQuestionModal onRequestClose={ dismissSurvey }/>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  surveyWasCompleted: state.survey.surveyResults ? true : false
});

const mapActionsToProps = {
  onDismissSurvey
}

export default connect(mapStateToProps, mapActionsToProps)(Survey);
