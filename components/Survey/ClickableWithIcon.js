import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MKButton } from 'react-native-material-kit';

import styles from './styles.js';

export default class ClickableWithIcon extends React.Component {
  render() {
    return(
      <MKButton 
        style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
        rippleLocation='center'
        rippleColor="rgba(128, 128, 128, 0.15)"
        maskBorderRadiusInPercent={ 50 }
        onPress={ this.props.onPress }>
        <Icon name={this.props.icon}
              style={ styles.icon }
              size={30}/>
        <Text style={ styles.choiceText}>{ this.props.text }</Text>
      </MKButton>
    );
  }
};
