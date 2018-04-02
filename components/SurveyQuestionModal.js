import React from 'react';
import { Modal, 
         StyleSheet,
         Text, 
         TouchableHighlight, 
         View } from 'react-native';
import BaseStyle from '../styles/base.js';

export default class SurveyQuestionModal extends React.Component {
  state = {
    modalVisible: true,
  };

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
      <View>
        <Text>Yo soy el modal</Text>
      </View>
    );
  }
}

const borderRadius = 5;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    backgroundColor: BaseStyle.colors.primaryBackgroundColor,
    borderWidth: 2,
    borderRadius: 2,
  },
  headerStyle: {
    backgroundColor: BaseStyle.colors.secondaryBackgroundColor,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20 
  },
  headerText: {
    color: BaseStyle.colors.secondaryTextColor,
    fontWeight: 'bold',
    fontSize: 20
  }
});
