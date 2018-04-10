import React from 'react';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableHighlight, View } from 'react-native';

export default class ClickableWithIcon extends React.Component {
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
