import Config from '../config/index.js';

const sha256 = require('js-sha256');

export default {
  nonceRequest: async function() {
    const nonce = {
      method: 'POST'
    }
    let response = await fetch(Config.SERVER_URL_NONCE, nonce);
    if (!response.ok) {
      throw response;
    }
    let responseJson = await response.json();
    keySha = { 'h': sha256(responseJson.key) };
    return { key: responseJson.key, shaObj: keySha };
  },

  challengeRequest: async function(key, shaObj) {
    const challenge = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''+key,
      },
      body: JSON.stringify(shaObj)
    }
    let response = await fetch(Config.SERVER_URL_CHALLENGE, challenge);
    if (!response.ok) {
      throw response;
    }
    let responseJson = await response.json();
    return responseJson.token;
  },

  postQuake: async function(body, userToken) {
    const quake = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+userToken
      },
      body: JSON.stringify(body)
    };
    let response = await fetch(Config.SERVER_URL_REPORTS, quake);
    if (!response.ok) {
      throw response;
    }
    let responseJson = await response.json();
    return responseJson.id;
  },
  
  patchSurvey: async function(body, id, userToken) {
    const survey = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+userToken
      },
      body: JSON.stringify(body)
    };
    patchUrl = Config.SERVER_URL_REPORTS + id + '/';
    return fetch(patchUrl, survey);
  },
}
