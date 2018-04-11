import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles.js';
import BaseStyle from './../../styles/base.js';

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
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity 
              onPress={ () => { this.props.onDismissSurvey() } }>
              <Icon name="window-close" size={ 50 } color='#000' />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
