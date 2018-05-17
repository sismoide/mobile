import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

import onDismissSurvey from '../../actions/survey/on_dismiss_survey.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles.js';
import BaseStyle from './../../styles/base.js';

const theme = getTheme();

export default function SurveyModal(props) {
  return (
    <Modal
      useNativeDriver={ true }
      animationOut='bounceOut'
      animationIn='fadeInRight'
      transparent={ true }
      isVisible={ props.isVisible }
      hideModalConentWhileAnimating={ true }
      onRequestClose={ props.onRequestClose } >
      <View style={{ flexDirection: 'column', flex: 1}}>
        <View style={{ flex: 0.5 }}/>
        <View style={ Object.assign({}, theme.cardStyle, { flex: 1 }) }>
          { props.children } 
        </View>
        <View 
          style={{ 
            flex: 0.5, 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
          <ExitSurveyButton onPress={ props.onRequestClose }/>
        </View>
      </View>
    </Modal>
  );
}

const ExitSurveyButton = new MKButton.Builder()
  .withBackgroundColor(MKColor.LightBlue)
  .withTextStyle({
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
    elevation: 4
  })
  .withFab(true)
  .withText('X')
  .build();
