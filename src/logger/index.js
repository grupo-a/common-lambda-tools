const error = function (functionName, errorMessage, err) {
  console.error(`${functionName} - ${errorMessage}`, err);
}

const info = function (functionName, message) {
  console.info(`${functionName} - ${message}`);
}

const warn = function (functionName, message) {
  console.warn(`${functionName} - ${message}`);
}

const audit = function (uuid, action, payload) {
  console.info('AUDIT', {'timestamp': Date.now(), 'uuid': uuid, 'action': action, 'payload': payload});
}

module.exports = {
  error,
  info,
  warn,
  audit
};
