import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, 
         Text, 
         TouchableHighlight, 
         View } from 'react-native';
import styles from './styles.js';
import ModalHeader from './ModalHeader.js';

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
              <ModalHeader text='Felicitaciones!'/>
            </View>
          </View>
          <View style={{ flex: 0.5 }}/>
        </View>
      </Modal>
    );
  }
};
