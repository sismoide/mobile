import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, 
         StyleSheet,
         Text, 
         TouchableHighlight, 
         View } from 'react-native';
import BaseStyle from '../styles/base.js';

export default class SurveyQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  dismissModal() {
    this.setState({ modalVisible: false});
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <View style={{ flexDirection: 'column', flex: 1}}>
          <View style={{ flex: 0.5 }}/>
          <View style={{ flexDirection: 'row', flex: 1}}>
            <View style={{ flex: 0.1}}/>
            <View style={ styles.modalContainer }>
              <ModalHeader/>
              <ModalButtonChoices/>
            </View>
          </View>
          <View style={{ flex: 0.5 }}/>
        </View>
      </Modal>
    );
  }
};

class ModalHeader extends React.Component {
  render() {
    return(
      <View style={ styles.headerStyle } >
        <Text style={ styles.headerText }>
          Se están moviendo las mesas o los platos?
        </Text>
      </View>
    )
  }
}

class ModalButtonChoices extends React.Component {
  render() {
    return(
      <View style={ styles.buttonContainer }>
        <Choice icon='thumbs-down' text='NO'/>
        <Choice icon='thumbs-up' text='SÍ'/>
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
        <TouchableHighlight>
          <Text style={ styles.choiceText}>{ this.props.text }</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    backgroundColor: BaseStyle.colors.primaryBackgroundColor,
    borderWidth: 2,
    borderRadius: 2,
  },
  headerStyle: {
    backgroundColor: BaseStyle.colors.secondaryBackgroundColor,
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20 
  },
  headerText: {
    color: BaseStyle.colors.secondaryTextColor,
    fontWeight: 'bold',
    fontSize: 20
  },
  buttonContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center'
  },
  choiceText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#888',
    padding: 20
  },
  icon: {
    color: '#888',
    padding: 20
  }
});
