import { AsyncStorage } from 'react-native';

const QUAKE_REPORTS_KEY = '@QuakeReports:all';

export default {
  /**
   * Store a quake report
   *
   * @param { Object } - geolocation: Where the quake submission is coming from.
   * @returns { Promise }
   */
  submitQuakeReport: async function(geolocation) {
    let existingReports = null;
    try {
      // Check whether there are previous quake submissions.
      existingReports = await AsyncStorage.getItem(QUAKE_REPORTS_KEY);
      existingReports = JSON.parse(existingReports);
    } catch (error) { }
    const createReport = function(geolocation) {
      return {
        timestamp: `${ Date.now() }`,
        geolocation: geolocation
      }
    };
    if (existingReports) {
      // If there were previous quake submissions, push to them.
      existingReports.push(createReport(geolocation));
      return AsyncStorage.setItem(
        QUAKE_REPORTS_KEY,
        JSON.stringify(existingReports));
    } else {
      // Else, we need to create the key-value pair
      return AsyncStorage.setItem(
        QUAKE_REPORTS_KEY,
        JSON.stringify([ createReport(geolocation) ]));
    }
  },

  /**
   * @returns { Promise }: All recorded quake reports
   */
  getQuakeReports: async function() {
    try {
      return JSON.parse(await AsyncStorage.getItem(QUAKE_REPORTS_KEY));
    } catch(error) {
      return [];
    }
  }
}
