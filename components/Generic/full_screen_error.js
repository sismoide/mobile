import React from 'react';
import { Text, View } from 'react-native';

export default (props) => (
  <View style={{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }}>
    <Text>{ props.message }</Text>
  </View>
);
