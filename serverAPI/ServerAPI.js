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
    
    fetch(Config.SERVER_URL, quake)
      .then((response) => response.json())
      .then((responseJson) => {
		return responseJson.id;
      });
  },
  
  patchSurvey: function(body) {
    const survey = {
      method: 'PATCH',
      body: JSON.stringify(body)
    };
    
    fetch(Config.SERVER_URL+body.id, survey)
	  .then(() => {});
  },
  
  setAccount: function() {},
  
  getAccountID: function() {}
}