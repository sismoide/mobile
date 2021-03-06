import { StyleSheet } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import BaseStyle from '../../styles/base.js';

export default StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    backgroundColor: BaseStyle.colors.primaryBackgroundColor,
    borderWidth: 2,
    borderRadius: 2,
  },
  headerStyle: {
    backgroundColor: MKColor.LightBlue,
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20 
  },
  headerText: {
    color: BaseStyle.colors.secondaryTextColor,
    fontWeight: 'bold',
    fontSize: 20
  },
  buttonContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  choiceText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#888',
    padding: 20
  },
  icon: {
    color: '#888',
    padding: 20
  },
});
