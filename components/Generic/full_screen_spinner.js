import React from 'react';
import { View } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';

export default (props) => (
  <View style={{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }}>
    <MKSpinner style={{ width: 100, height: 100 }}/>
  </View>
);
