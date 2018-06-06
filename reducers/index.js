import { combineReducers } from 'redux';

import home from './home';
import survey from './survey';
import geolocation from './geolocation';
import map from './map';

export default combineReducers({
  home,
  survey,
  geolocation,
  map
});
