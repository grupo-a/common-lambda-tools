const request = require('request');

const requestHandler = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.statusCode >= 300) {
        let data;
        try{
          data = JSON.parse(result.body);
        }
        catch {
          data.body = result.body;
        }
        data.status_code    = result.statusCode;
        data.status_message = result.statusMessage;
        return reject(data);
      }

      if (result.body) {
        console.log(result);
        console.log(result.headers);
        let body;
        try{
          body = JSON.parse(result.body);
        }
        catch {
          body = result.body;
        }
        return resolve(body);
      }

      return resolve();
    });
  });

};

module.exports = {
  requestHandler
};
