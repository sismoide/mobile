import React from 'react';
import { Dimensions, Modal, Text, View, Image } from 'react-native';
import SurveyQuestionModal from './SurveyQuestionModal.js';
import SurveyCompleteModal from './SurveyCompleteModal.js';
import questions from './questions.js';
import navigationOptions from '../../styles/navigation_options.js';


/**
 * @param {Object} - navigationOptions: original navigation options object.
 * @returns {Object} - navigation options that don't include a back button.
 */
function withoutBackButton(navigationOptions) {
  let clonedNavigationOptions = Object.assign(navigationOptions, {});
  clonedNavigationOptions.headerLeft = null;
  return clonedNavigationOptions;
}

/**
 * This component is in charge of rendering question components, 
 * with which the user will interact.
 */
export default class Survey extends React.Component {
  static navigationOptions = withoutBackButton(navigationOptions);
  constructor(props) {
    super(props);
    this.questions = questions;
    this.state = {
      activeQuestionIndex: 0,
      binarySearchLo: 0,
      binarySearchHi: this.questions.length - 1,
      binarySearchMid: Math.floor((this.questions.length - 1) / 2),
      surveyResults: null
    }
  }

  /**
   * This method is triggered when the user taps yes/no during the survey,
   * notifying the submission of a response.
   * Updates the active question so that the appropriate modal can be rendered.
   */
  onResponse(questionId, response) {
    let lo = this.state.binarySearchLo;
    let hi = this.state.binarySearchHi;
    let mid = this.state.binarySearchMid;
    if (response == SurveyQuestionModal.RESPONSES.NO) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
    mid = Math.floor((hi + lo) / 2);
    this.setState({
      binarySearchLo: lo,
      binarySearchHi: hi,
      binarySearchMid: mid
    });
    if (lo >= hi) {
      this.setState({ 
        surveyResults: { intensity: this.questions[mid].intensity } 
      });
    }
  }

  /**
   * Depending on whether the survey is complete or not,
   * renders either a question modal or the final modal that tells
   * the user he's done with the survey.
   * @returns the modal element.
   */
  showModal = () => {
    console.log(this.state);
    if (this.state.surveyResults !== null) {
      return <SurveyCompleteModal/>;
    }
    return this.questions.map((question, index) => (
      <SurveyQuestionModal
        key={ index }
        question={ question }
        onResponse={ this.onResponse.bind(this) }
        visible={ this.state.binarySearchMid === index } />
    ))
  }

  render() {
    const { height, width } = Dimensions.get('window');
    return( 
      <View>
        <Image source={require('../../assets/map.png')} style={ { height: height, width: width } }/>
        {
          this.showModal()
        }	
      </View>
    );
  }
}
