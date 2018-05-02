import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Dimensions, Modal, Text, View, Image, NetInfo, AsyncStorage } from 'react-native';
import SurveyQuestionModal from './SurveyQuestionModal.js';
import SurveyCompleteModal from './SurveyCompleteModal.js';
import questions from './questions.js';
import navigationOptions from '../../styles/navigation_options.js';
import Config from '../../config/index.js';
import Synchronizer from '../Synchronizer.js';
import Storage from "../../database/storage.js";

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
      shouldShowModal: false,
      activeQuestionIndex: 0,
      binarySearchLo: 0,
      binarySearchHi: this.questions.length - 1,
      binarySearchMid: Math.floor((this.questions.length - 1) / 2),
      surveyResults: null // No results, since the survey hasn't been completed.
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // Wait 1 second for the main view to load
      // to allow smoother modal transitions.
      this.setState({ shouldShowModal: true })
    }, 1000);
  }

  /**
   * This method is triggered when the user taps yes/no during the survey,
   * notifying the submission of a response.
   * Updates the active question so that the appropriate modal can be rendered.
   */
  onResponse = (questionId, response) => {
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
      const surveyResults = { intensity: this.questions[mid].intensity };
      this.setState({
        surveyResults: surveyResults
      });
      this.onSurveyCompleted( surveyResults );
    }
  }
   
  /**
   * Triggered when survey results are available.
   * @param { Object } - surveyResults: the survey results.
   */
  onSurveyCompleted = (surveyResults) => {
    Storage.submitLatestQuakeIntensity(surveyResults.intensity).then(() => { Synchronizer.onDataChange() })
  }

  onDismissSurvey = () => {
    /*
    * Go home and wipe navigation stack, because user
    * shouldn't be able to come back here.
    */
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
    }));
  }

  modalShouldBeVisible = (questionIndex) => {
    // Don't show anything if the survey was canceled/completed.
    // Dont't show the modal if it's not its turn.
    return this.state.binarySearchMid === questionIndex;
  }
  
  /**
   * Depending on whether the survey is complete or not,
   * renders either a question modal or the final modal that tells
   * the user he's done with the survey.
   * @returns the modal element.
   */
  showModal = () => {
    if (this.state.surveyResults !== null) {
      // If `surveyResults` exists, then the survey was completed.
      return( 
        <SurveyCompleteModal 
          intensity={ this.state.surveyResults.intensity }
          isVisible={ true }
          onDismissSurvey={ this.onDismissSurvey } />
      );
    }
    for (let questionIndex = 0; questionIndex < this.questions.length; ++questionIndex) {
      if (this.modalShouldBeVisible(questionIndex)){ 
        return(
          <SurveyQuestionModal
            key={ questionIndex }
            question={ this.questions[questionIndex] }
            onResponse={ this.onResponse }
            onDismissSurvey= { this.onDismissSurvey }
            isVisible={ true } />
        );
      }
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    return( 
      <View>
        <Image source={require('../../assets/map.png')} style={ { height: height, width: width } }/>
        {
          this.state.shouldShowModal && this.showModal()
        }	
      </View>
    );
  }
}
