import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, 
         Text, 
         TouchableHighlight, 
         View } from 'react-native';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';
import SurveyModal from './SurveyModal.js';

/**
 * Represents a modal with a question with which the user can interact (say yes/no).
 */
export default class SurveyQuestionModal extends React.Component {
  static RESPONSES = {
    NO: 0,
    YES: 1
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SurveyModal visible={ this.props.visible }>
        <ModalHeader text={ this.props.question.question }/>
        <ModalButtonChoices 
          questionId={ this.props.question.id }
          onResponse={ this.props.onResponse }/>
      </SurveyModal>
    );
  }
};

class ModalButtonChoices extends React.Component {
  render() {
    return(
      <View style={ styles.buttonContainer }>
        <Choice 
          icon='thumbs-down' 
          text='NO' 
          onPress={ () => { 
            this.props.onResponse(
              this.props.questionId,
              SurveyQuestionModal.RESPONSES.NO);
          } }/>
        <Choice 
          icon='thumbs-up' 
          text='SÍ'
          onPress={ () => { 
            this.props.onResponse(
              this.props.questionId,
              SurveyQuestionModal.RESPONSES.YES);
          } }/>
      </View>
    );
  }
}

class Choice extends React.Component {
  render() {
    return(
      <View style={ styles.button }>
        <Icon name={this.props.icon}
              style={ styles.icon }
              size={30}/>
          <TouchableHighlight 
            onPress={ this.props.onPress }>
          <Text style={ styles.choiceText}>{ this.props.text }</Text>
        </TouchableHighlight>
      </View>
    );
  }
};
