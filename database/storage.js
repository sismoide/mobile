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
        created_on: `${ (new Date()).toISOString() }`,
        coordinates: geolocation,
        quakeId: uuid()
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
    return this.submitQuakeIntensity(latestReport.quakeId, intensity);
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

  /**
   * @returns { (String | null) } UNIX timestamp or null if no records found.
   */
  getLatestQuakeSubmissionTimestamp: async function() {
    let reports = null;
    try {
      reports = JSON.parse(await AsyncStorage.getItem(QUAKE_REPORTS_KEY));
    } catch (error) { }
    if (reports) {
      return reports.slice(-1)[0].created_on;
    }
    return null;
  },

  /**
   * @returns { Promise(Array) } Quake intensities
   */
  getIntensities: async function() {
    try {
      const intensities = JSON.parse(await AsyncStorage.getItem(QUAKE_INTENSITIES_KEY));
      if (!intensities) {
        return [];
      }
      return intensities;
    } catch (error) {
      return [];
    }
  },

  /**
   * @returns { Promise(Array) }: All recorded quake reports
   */
  getQuakeReports: async function() {
    try {
      const quakeReports = JSON.parse(await AsyncStorage.getItem(QUAKE_REPORTS_KEY));
      if (!quakeReports) {
        return [];
      }
      return quakeReports;
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
  
  setStorageItem: async function(name, itemString) {
    return AsyncStorage.setItem(name, itemString);
  },
  
  getStorageItem: async function(name) {
    return AsyncStorage.getItem(name);
  },
  
  removeStorageItem: async function(name) {
    return AsyncStorage.removeItem(name);
  },
}
