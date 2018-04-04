import React from 'react';
import { Dimensions, Modal, Text, View, Image } from 'react-native';
import SurveyQuestionModal from './SurveyQuestionModal.js';
import SurveyCompleteModal from './SurveyCompleteModal.js';
import questions from './questions.js';


/**
 * This component is in charge of rendering question components, 
 * with which the user will interact.
 */
export default class Survey extends React.Component {
  static navigationOptions = {
    // disable back button during survey
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.questions = questions;
    this.state = {
      activeQuestionIndex: 0
    }
  }

  /**
   * This method is triggered when the user taps yes/no during the survey,
   * notifying the submission of a response.
   * Updates the active question so that the appropriate modal can be rendered.
   */
  onResponse(questionId, response) {
    this.setState({ activeQuestionIndex: this.state.activeQuestionIndex + 1});
  }

  /**
   * Depending on whether the survey is complete or not,
   * renders either a question modal or the final modal that tells
   * the user he's done with the survey.
   * @returns the modal element.
   */
  showModal = () => {
    if (this.state.activeQuestionIndex >= this.questions.length) {
      return <SurveyCompleteModal/>;
    }
    return this.questions.map((question, index) => (
      <SurveyQuestionModal
        key={ index }
        question={ question }
        onResponse={ this.onResponse.bind(this) }
        visible={ this.state.activeQuestionIndex === index } />
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
