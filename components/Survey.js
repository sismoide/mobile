import React from 'react';
import { Modal, TouchableHighlight, Text, View, StyleSheet } from 'react-native';

import SurveyQuestionModal from './SurveyQuestionModal.js';


export default class Survey extends React.Component {
  state = {
    modalVisible: false,
  };

  toggleModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    return( 
      <SurveyQuestionModal/>
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
