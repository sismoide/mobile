import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, 
         Text, 
         TouchableHighlight, 
         View } from 'react-native';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';

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
      <Modal
        animationType="fade"
        transparent={ true }
        visible={ this.props.visible }
        onRequestClose={() => {}}>
        <View style={{ flexDirection: 'column', flex: 1}}>
          <View style={{ flex: 0.5 }}/>
          <View style={{ flexDirection: 'row', flex: 1}}>
            <View style={{ flex: 0.1}}/>
            <View style={ styles.modalContainer }>
              <ModalHeader text={ this.props.question.question }/>
              <ModalButtonChoices 
                questionId={ this.props.question.id }
                onResponse={ this.props.onResponse }/>
            </View>
          </View>
          <View style={{ flex: 0.5 }}/>
        </View>
      </Modal>
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
