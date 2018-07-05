import { CONNECTION_STATUS_CHANGED } from '../types.js';

export default (status) => ({
  type: CONNECTION_STATUS_CHANGED,
  payload: { status }
})
