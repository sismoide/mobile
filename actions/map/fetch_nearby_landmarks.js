import fetchNearbyLandmarksRequest from './fetch_nearby_landmarks_request.js';
import nearbyLandmarksReceived from './nearby_landmarks_received.js';
import nearbyLandmarksError from './nearby_landmarks_error.js';

import ServerAPI from '../../serverAPI/ServerAPI.js';
import StubLandmarks from '../../stub/landmarks.js';
import { SHOW_STUB_LANDMARKS } from '../../config';

export default (position) => {
  return async (dispatch, getState) => {
    dispatch(fetchNearbyLandmarksRequest());
    if (SHOW_STUB_LANDMARKS) {
      dispatch(
        nearbyLandmarksReceived(
          Array(5).fill(position).map(StubLandmarks.randomStubLandmarkAround)
        )
      );
      return;
    }
    const userToken = getState().authentication.userToken;
    if (!userToken) {
      dispatch(nearbyLandmarksError('No user token'));
      return;
    }
    if (!position) {
      dispatch(nearbyLandmarksError('No user location'));
      return;
    }
    try {
      dispatch(nearbyLandmarksReceived(
        await ServerAPI.fetchNearbyLandmarks(userToken, position)));
    } catch (error) {
      dispatch(nearbyLandmarksError(error));
    }
  }
}
