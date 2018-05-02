import React from 'react';
import { Text, TouchableHighlight,  View } from 'react-native';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';
import ClickableWithIcon from './ClickableWithIcon.js';

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
      <SurveyModal 
        isVisible={ this.props.isVisible }
        onDismissSurvey={ this.props.onDismissSurvey} >
        <ModalHeader text={ 'Terminaste la encuesta, campeón. Te felicito!'
          + ` Según nuestros cálculos, estás percibiendo un sismo de intensidad ${this.props.intensity}.` }/>
        <ThankYouButton onPress={ () => { this.props.onDismissSurvey() } }/>
      </SurveyModal>
    );
  }
};


class ThankYouButton extends React.Component {
  render() {
    return(
      <View style={ styles.buttonContainer }>
        <ClickableWithIcon 
          icon='thumbs-up' 
          text='De nada!'
          onPress={ this.props.onPress } />
      </View>
    );
  }
}
