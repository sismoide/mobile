import { USER_TOKEN_RECEIVED } from '../types.js';

export default (token) => ({
  type: USER_TOKEN_RECEIVED,
  payload: { token },
})
