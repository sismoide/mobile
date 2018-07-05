import { SYNCHRONIZER_ERROR } from '../types.js';

export default (error) => ({
  type: SYNCHRONIZER_ERROR,
  payload: { error }
});
