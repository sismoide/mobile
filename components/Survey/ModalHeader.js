import React from 'react';
import { Modal, 
         Text, 
         View } from 'react-native';
import styles from './styles.js';

export default class ModalHeader extends React.Component {
  render() {
    return(
      <View style={ styles.headerStyle } >
        <Text style={ styles.headerText }>
          { this.props.text }
        </Text>
      </View>
    )
  }
}
