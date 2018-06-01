import React from 'react';
import { View } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';

export default (props) => (
  <View style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  }}>
    <MKSpinner strokeWidth={ 10 } style={{ width: 100, height: 100 }}/>
  </View>
);
