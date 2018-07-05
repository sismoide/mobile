import fetchNearbyLandmarksRequest from './fetch_nearby_landmarks_request.js';
import nearbyLandmarksReceived from './nearby_landmarks_received.js';

import StubLandmarks from '../../stub/landmarks.js';
import { SHOW_STUB_LANDMARKS } from '../../config';

export default (position) => {
  return dispatch => {
    dispatch(fetchNearbyLandmarksRequest());
    if (SHOW_STUB_LANDMARKS) {
      dispatch(
        nearbyLandmarksReceived(
          Array(5).fill(position).map(StubLandmarks.randomStubLandmarkAround)
        )
      );
    }
    return;
  }
  // TODO: do server request
}
