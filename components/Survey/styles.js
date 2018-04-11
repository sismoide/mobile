import { StyleSheet } from 'react-native';
import BaseStyle from '../../styles/base.js';

export default StyleSheet.create({
  modalContainer: {
    flex: 0.8,
    backgroundColor: BaseStyle.colors.primaryBackgroundColor,
    borderWidth: 2,
    borderRadius: 2,
  },
  headerStyle: {
    backgroundColor: BaseStyle.colors.secondaryBackgroundColor,
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
  button: {
    flex: 1, 
    flexDirection: 'column',
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
