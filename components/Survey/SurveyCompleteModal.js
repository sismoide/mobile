import React from 'react';
import { Text, TouchableHighlight,  View } from 'react-native';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';
import styles from './styles.js';

/**
 * Represents the modal the user sees when he's done with the survey
 */
export default class SurveyCompleteModal extends React.Component {
  static RESPONSES = {
    NO: 0,
    YES: 1
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SurveyModal visible={ true }>
        <ModalHeader text={ 'Terminaste la encuesta, campeón. Te felicito!'
          + ` Según nuestros cálculos, estás percibiendo un sismo de intensidad ${this.props.intensity}.` }/>
        <ThankYouButton/>
      </SurveyModal>
    );
  }
};


class ThankYouButton extends React.Component {
  render() {
    return(
      <View style={ styles.buttonContainer }>
        <TouchableHighlight onPress={ () => {} }>
          <Text>Press me</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
