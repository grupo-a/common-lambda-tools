const bodyValidator  =  require('./validator/body.validator');
const customError    = require('./models/CustomError.model');
const customResponse = require('./models/CustomResponse.model');
const dbPgService    = require('./services/dbPg.service');
const logger         = require('./logger');
const requestHttp    = require('./http/request.http');
const responseHttp   = require('./http/response.http');
const xrayConfig     =  require('./configs/xray.config');

module.exports = {
  bodyValidator,
  customError,
  customResponse,
  dbPgService,
  logger,
  requestHttp,
  responseHttp,
  xrayConfig
};