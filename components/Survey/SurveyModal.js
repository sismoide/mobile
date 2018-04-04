import React from 'react';
import { Modal, View } from 'react-native';
import styles from './styles.js';

export default class SurveyModal extends React.Component {
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
              { this.props.children } 
            </View>
          </View>
          <View style={{ flex: 0.5 }}/>
        </View>
      </Modal>
    );
  }
}
