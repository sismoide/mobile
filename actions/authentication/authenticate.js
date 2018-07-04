import { AsyncStorage } from 'react-native';

import authenticationChallengeStarted from './authentication_challenge_started.js';
import userTokenReceived from './user_token_received.js';
import authenticationFailed from './authentication_failed.js';

import ServerAPI from '../../serverAPI/ServerAPI.js';

const USER_TOKEN_KEY = '@Auth:UserToken';

export default () => {
  return async (dispatch, getState) => {
    if (getState().authentication.userToken) {
      // If already authenticated, do nothing.
      return;
    }

    try {
      // Check if the user had already created an account
      const storedUserToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
      if (storedUserToken) {
        console.log(`Using stored user token: ${ storedUserToken }`);
        dispatch(userTokenReceived(storedUserToken));
        return;
      }
    } catch (error) { /* do nothing, just get a new token */ }

    dispatch(authenticationChallengeStarted());
    try {
      nonce = await ServerAPI.nonceRequest();
      userToken = await ServerAPI.challengeRequest(nonce.key, nonce.shaObj);
    } catch (err) {
      dispatch(authenticationFailed(err));
      return;
    }
    if (!userToken) {
      // Probably a bug with the server.
      // `userToken` should never evaluate to false here.
      dispatch(authenticationFailed('Server responds with null user token'));
      return;
    }
    // Store the newly created user token
    AsyncStorage.setItem(USER_TOKEN_KEY, userToken);
    dispatch(userTokenReceived(userToken));
  }
}
