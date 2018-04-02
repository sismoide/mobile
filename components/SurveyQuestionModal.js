import React from 'react';
import { Modal, Text, View } from 'react-native';

export default class SurveyQuestionModal extends React.Component {
  state = {
    isVisible: true,
  };

  render() {
    return(
      <View>
        <Text>Yo soy el modal</Text>
      </View>
    );
  }
};
