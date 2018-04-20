import uuid from 'uuid/v1';
import { AsyncStorage } from 'react-native';

const QUAKE_REPORTS_KEY = '@QuakeReports:all';
const QUAKE_INTENSITIES_KEY = '@QuakeIntensities:all';

export default {
  /**
   * Store a quake report.
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
        timestamp: `${ new Date().toISOString() }`,
        coordinates: geolocation,
        id: uuid()
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
   * Updates the latest quake report with an intensity. 
   *
   * @param intensity
   * @throws { String } - When there are no reports at all.
   */
  submitLatestQuakeIntensity: async function(intensity) {
    let allReports = null;
    try {
      allReports = JSON.parse(await AsyncStorage.getItem(QUAKE_REPORTS_KEY));
    } catch (error) {
      throw 'Can\'t patch intensity because there are no reports';
    }
    let latestReport = allReports.slice(-1)[0];
    return this.submitQuakeIntensity(latestReport.id, intensity);
  },

  /**
   * Creates an intensity entry associated with an intensity and a quake report.
   *
   * @param quakeReportId
   * @param intensity
   * @returns {undefined}
   */
  submitQuakeIntensity: async function(quakeReportId, intensity) {
    let allIntensities = null;
    try {
      allIntensities = JSON.parse(await AsyncStorage.getItem(QUAKE_INTENSITIES_KEY));
    } catch (error) { }
    const createIntensityEntry = function(quakeReportId, intensity) {
      return {
        quakeId: quakeReportId,
        intensity: intensity
      };
    }
    if (allIntensities) {
      allIntensities.push(createIntensityEntry(quakeReportId, intensity));
      return AsyncStorage.setItem(
        QUAKE_INTENSITIES_KEY,
        JSON.stringify(allIntensities));
    } else {
      return AsyncStorage.setItem(
        QUAKE_INTENSITIES_KEY,
        JSON.stringify([ createIntensityEntry(quakeReportId, intensity) ]));
    }
  },

  getIntensities: async function() {
    try {
      return JSON.parse(await AsyncStorage.getItem(QUAKE_INTENSITIES_KEY));
    } catch (error) {
      return [];
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
  },

  clearQuakeReports: async function() {
    return AsyncStorage.removeItem(QUAKE_REPORTS_KEY);
  },

  clearIntensities: async function() {
    return AsyncStorage.removeItem(QUAKE_INTENSITIES_KEY);
  },
}