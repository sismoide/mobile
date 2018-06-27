import { AUTHENTICATION_FAILED } from '../types.js';

export default (error) => ({
  type: AUTHENTICATION_FAILED,
  payload: { error }
});
