import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles.js';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';
import ClickableWithIcon from './ClickableWithIcon.js';

import onQuestionAnswered from '../../actions/survey/on_question_answered.js';

/**
 * Represents a modal with a question with which the user can interact (say yes/no).
 */
class SurveyQuestionModal extends React.Component {
  render() {
    const { 
      question,
      shouldBeVisible, 
      couldBeVisible } = this.props;
    return (
      <SurveyModal
        isVisible={ shouldBeVisible && couldBeVisible }
        onRequestClose={ () => { } } >
        <ModalHeader text={ question.question }/>
        <ConnectedModalButtonChoices />
      </SurveyModal>
    );
  }
};

class ModalButtonChoices extends React.Component {
  render() {
    const { onQuestionAnswered } = this.props;
    return(
      <View style={ styles.buttonContainer }>
        <ClickableWithIcon
          icon='thumbs-down' 
          text='NO' 
          onPress={ () => onQuestionAnswered('NO') }/>
        <ClickableWithIcon
          icon='thumbs-up' 
          text='SÍ'
          onPress={ () => onQuestionAnswered('YES') }/>
      </View>
    );
  }
}

const ConnectedModalButtonChoices = connect(null, { onQuestionAnswered })(ModalButtonChoices);

const mapStateToProps = (state) => ({
  question: state.survey.currentQuestion,
  shouldBeVisible: state.survey.surveyResults ? false : true,
  couldBeVisible: !state.survey.modalsTransitioning
});

export default connect(mapStateToProps)(SurveyQuestionModal);
