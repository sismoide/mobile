import React from 'react';
import { Modal, TouchableHighlight, Text, View, StyleSheet } from 'react-native';

import SurveyQuestionModal from './SurveyQuestionModal.js';


export default class Survey extends React.Component {
  static navigationOptions = {
    // disable back button during survey
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.questions = [
      { id: 0, question: 'Te gustan los árboles?' },
      { id: 1, question: 'Se están moviendo las mesas?' },
      { id: 2, question: 'Se destruyeron los autos?' }
    ];
    this.state = {
      activeQuestionId: 0
    }
  }

  onResponse(questionId, response) {
    this.setState({ activeQuestionId: this.state.activeQuestionId + 1});
  }

  render() {
    return( 
      <View>
        {
          this.questions.map((question) => (
            <SurveyQuestionModal
              key={ question.id }
              question={ question }
              onResponse={ this.onResponse.bind(this) }
              visible={ this.state.activeQuestionId === question.id } />
          ))
				}	
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  }
});
