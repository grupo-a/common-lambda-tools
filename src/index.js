const customError    = require('./models/CustomError.model');
const dbPgService    = require('./services/dbPg.service');
const logger         = require('./logger');
const requestHttp    = require('./http/request.http');
const responseHttp   = require('./http/response.http');
const bodyValidator  =  require('./validator/body.validator');
const xrayConfig     =  require('./configs/xray.config');

module.exports = {
  customError,
  dbPgService,
  logger,
  requestHttp,
  responseHttp,
  bodyValidator,
  xrayConfig
};