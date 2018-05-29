import { combineReducers } from 'redux';

import home from './home';
import survey from './survey';
import geolocation from './geolocation';
import buttons from './buttons';

export default combineReducers({
  buttons,
  home,
  survey,
  geolocation
});
