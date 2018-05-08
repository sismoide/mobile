import { QUESTION_ANSWERED } from '../types.js';

export default (response) => ({
  type: QUESTION_ANSWERED,
  payload: { response }
})
