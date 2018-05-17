import userLocationRequest from './user_location_request.js';
import userLocationReceived from './user_location_received.js';
import userLocationError from './user_location_error.js';

export default (dispatch) => {
  return dispatch => {
    dispatch(userLocationRequest());
    if (!navigator.geolocation) {
      dispatch(userLocationError());
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(userLocationReceived({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    });
  }
}
