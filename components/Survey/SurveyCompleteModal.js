import React from 'react';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';

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
        <ModalHeader text='Terminaste la encuesta, campeón. Te felicito!'/>
      </SurveyModal>
    );
  }
};
