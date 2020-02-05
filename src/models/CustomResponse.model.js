module.exports = class CustomResponse {
  constructor(body, httpStatusCode = 200, headers = {}) {
      this.body           = body;
      this.httpStatusCode = httpStatusCode;
      this.headers        = headers;
  }
}