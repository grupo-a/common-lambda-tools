const enableXray = () => (process.env.NODE_ENV === 'production');

const init = () => {
  if(enableXray()) {
    const xray = require('aws-xray-sdk');
    xray.captureHTTPsGlobal(require('http'));
    xray.captureAWS(require('aws-sdk'));
  }
}

const loadPG = () => {
  if(enableXray()) {
    const AWSXRay = require('aws-xray-sdk');
    return AWSXRay.capturePostgres(require('pg'));
  }

  return require('pg');
}

module.exports = {
  init,
  loadPG
};