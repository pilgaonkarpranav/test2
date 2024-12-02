import jsonData from '../data/data.json';

const helpers = {
    httpGet: function (url) {
      //const data = await fetch(url, {});
      const data = JSON.parse(JSON.stringify(jsonData));
      return data;
    },
  };
  export default helpers;