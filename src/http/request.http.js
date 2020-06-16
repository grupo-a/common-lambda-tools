const request = require('request');

const requestHandler = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.statusCode >= 300) {
        const data          = JSON.parse(result.body);
        data.status_code    = result.statusCode;
        data.status_message = result.statusMessage;
        return reject(data);
      }

      if (result.body) {
        if(result.headers['content-type'] == 'application/xml' || result.headers['content-type'] == 'text/xml' || result.headers['content-type'] == 'application/octet-stream'){
          return resolve(result.body);
        }
        return resolve(JSON.parse(result.body));
      }

      return resolve();
    });
  });

};

module.exports = {
  requestHandler
};
