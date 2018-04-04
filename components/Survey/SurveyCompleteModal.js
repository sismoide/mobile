import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, 
         Text, 
         TouchableHighlight, 
         View } from 'react-native';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';

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
