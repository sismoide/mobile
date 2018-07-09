import fetchNearbyQuakesRequest from './fetch_nearby_quakes_request.js';
import nearbyQuakesReceived from './nearby_quakes_received.js';
import nearbyQuakesError from './nearby_quakes_error.js';

import ServerAPI from '../../serverAPI/ServerAPI.js';
import StubQuakes from '../../stub/quake.js';
import { SHOW_STUB_QUAKES } from '../../config';

/**
 * Asks the server for nearby quakes close to `position`.
 */
export default (position) => {
  return async (dispatch, getState) => {
    dispatch(fetchNearbyQuakesRequest());
    if (SHOW_STUB_QUAKES) {
      dispatch(
        nearbyQuakesReceived(
          Array(5).fill(position).map(StubQuakes.stubRichterQuakeReportAround)
        )
      );
      return;
    }   
    const userToken = getState().authentication.userToken;
    if (!userToken) {
      dispatch(nearbyQuakesError('No user token'));
      return;
    }
    if (!position) {
      dispatch(nearbyQuakesError('No user location'));
      return;
    }
    try {
      dispatch(nearbyQuakesReceived(
        await ServerAPI.fetchNearbyQuakes(userToken, position)));
    } catch (error) {
      dispatch(nearbyQuakesError(error));
    }
  }
}
