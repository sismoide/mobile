import React from 'react';
import { Modal, TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import SurveyQuestionModal from './SurveyQuestionModal.js';
import SurveyCompleteModal from './SurveyCompleteModal.js';
import questions from './questions.js';


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

  onResponse(questionId, response) {
    this.setState({ activeQuestionIndex: this.state.activeQuestionIndex + 1});
  }

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
    return( 
      <View>
        {
          this.showModal()
				}	
      </View>
    );
  }
}
