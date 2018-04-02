import React from 'react';
import { Modal, TouchableHighlight, Text, View, StyleSheet } from 'react-native';


export default class Survey extends React.Component {
  state = {
    modalVisible: false,
  };

  toggleModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    return( 
      <View style={{ flexDirection: 'column', flex: 1}}>
        <View style={{ flex: 0.5 }}/>
        <View style={{ flexDirection: 'row', flex: 1}}>
          <View style={{ flex: 0.1}}/>
          <View style={ styles.modalContainer }>
            <Text>Hola</Text>
          </View>
        </View>
        <View style={{ flex: 0.5 }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  }
});
