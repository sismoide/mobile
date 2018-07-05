import { INTENSITIES_SENT_TO_SERVER } from '../types.js'

export default (updatedIntensitiesInfo) => ({
  type: INTENSITIES_SENT_TO_SERVER,
  payload: { info: updatedIntensitiesInfo }
});

