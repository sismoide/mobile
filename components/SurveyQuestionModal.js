import React from 'react';
import { Modal, 
         StyleSheet,
         Text, 
         TouchableHighlight, 
         View } from 'react-native';

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
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{ flexDirection: 'column', flex: 1}}>
          <View style={{ flex: 0.5 }}/>
          <View style={{ flexDirection: 'row', flex: 1}}>
            <View style={{ flex: 0.1}}/>
            <View style={ styles.modalContainer }>
              <Text>Yo soy el modal</Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}/>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  }
});
