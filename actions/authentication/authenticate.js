import authenticationChallengeStarted from './authentication_challenge_started.js';
import userTokenReceived from './user_token_received.js';
import authenticationFailed from './authentication_failed.js';

import ServerAPI from '../../serverAPI/ServerAPI.js';

export default () => {
  return async (dispatch, getState) => {
    if (getState().authentication.userToken) {
      // If already authenticated, do nothing.
      return;
    }
    dispatch(authenticationChallengeStarted());
    try {
      nonce = await ServerAPI.nonceRequest();
      userToken = await ServerAPI.challengeRequest(nonce.key, nonce.shaObj);
    } catch (err) {
      dispatch(authenticationFailed(err));
      return;
    }
    dispatch(userTokenReceived(userToken));
  }
}
