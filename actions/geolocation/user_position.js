import userLocationRequest from './user_location_request.js';
import userLocationReceived from './user_location_received.js';
import userLocationError from './user_location_error.js';

import { USE_STUB_LOCATION } from '../../config';
import { BEAUCHEF } from '../../stub/locations.js';

export default (dispatch) => {
  const geolocationArgs = [
    (position) => {
      dispatch(userLocationReceived({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    },
    (error) => {
      dispatch(userLocationError(error));
    },
    {
      enableHighAccuracy: true,
      timeout: 10000
    }
  ];

  return {
    watch: () => (function(dispatch) { 
      // NOTE: No request action. This is intended.
      if (USE_STUB_LOCATION) {
        return;
      }
      if (!navigator.geolocation) {
        dispatch(userLocationError({ error: 'geolocation not available' }));
        return;
      }
      navigator.geolocation.watchPosition(...geolocationArgs);
    })(dispatch),

    get: () => (function(dispatch) {
      dispatch(userLocationRequest());
      if (USE_STUB_LOCATION) {
        dispatch(userLocationReceived(BEAUCHEF));
        return;
      }
      if (!navigator.geolocation) {
        dispatch(userLocationError({ error: 'geolocation not available' }));
        return;
      }
      navigator.geolocation.getCurrentPosition(...geolocationArgs);
    })(dispatch)
  }
}
