import Config from '../config/index.js';

export default {
  postQuake: function(body) {
    const quake = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    
    try {
      fetch(Config.SERVER_URL, quake)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.id);
        });
    } catch (error) {
      throw "ConnectionError";
    }
  },
  
  patchSurvey: function(body) {
    const survey = {
      method: 'PATCH',
      body: JSON.stringify(body)
    };
    
    try {
      fetch(Config.SERVER_URL, survey);
    } catch (error) {
      throw "ConnectionError";
    }
  },
  
  setAccount: function() {},
  
  getAccountID: function() {}
}