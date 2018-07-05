import { combineReducers } from 'redux';

import authentication from './authentication';
import home from './home';
import survey from './survey';
import synchronizer from './synchronizer';
import geolocation from './geolocation';
import map from './map';

export default combineReducers({
  authentication,
  home,
  survey,
  synchronizer,
  geolocation,
  map,
});
