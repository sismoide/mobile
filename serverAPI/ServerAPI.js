import Config from '../config/index.js';

export default {
  postQuake: async function(body) {
    const quake = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    let response = await fetch(Config.SERVER_URL, quake);
    let responseJson = await response.json();
    return responseJson.id;
  },
  
  patchSurvey: async function(body, id) {
//  patchSurvey: function(body) {
    const survey = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    patchUrl = Config.SERVER_URL+id+'/';
    fetch(patchUrl, survey);
  },
}