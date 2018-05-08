import React from 'react';
import { Text, TouchableHighlight,  View } from 'react-native';
import { connect } from 'react-redux';

import onDismissSurvey from '../../actions/survey/on_dismiss_survey.js';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';
import ClickableWithIcon from './ClickableWithIcon.js';

/**
 * Represents the modal the user sees when he's done with the survey
 */
class SurveyCompleteModal extends React.Component {
  render() {
    const { 
      onRequestClose,
      couldBeVisible, 
      surveyResults } = this.props;
    return (
      <SurveyModal 
        onRequestClose={ onRequestClose }
        isVisible={ couldBeVisible }>
        <ModalHeader text={ 'Terminaste la encuesta, campeón. Te felicito!'
          + ` Según nuestros cálculos, estás percibiendo un sismo de intensidad ${ surveyResults.intensity }.` }/>
        <ThankYouButton onPress={ () => { } }/>
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
          onPress={ () => {} } />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  surveyResults: state.survey.surveyResults,
  couldBeVisible: !state.survey.modalsTransitioning
});

export default connect(mapStateToProps)(SurveyCompleteModal);
