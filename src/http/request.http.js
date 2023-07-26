'use strict';

//
// dependencies
const axios = require('axios');

const AXIOS_TIMEOUT = 30_000;

/**
 * @template D
 * @param options {import('axios').AxiosRequestConfig<D>} - Axios options
 * @returns {Promise<unknown>}
 */
const requestHandler = async (options) => {
  if (options.uri) {
    options.url = options.uri;
    delete options.uri;
  }

  if (options.body) {
    options.data = options.body;
    delete options.body;
  }

  try {
    const response = await axios({
      timeout: AXIOS_TIMEOUT,
      ...options
    });

    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    if (!err.response.headers['content-type'].startsWith('application/json')) {
      throw err?.response?.data ?? null; // for backwards compatibility
    }

    throw {
      ...err.response.data,
      status: err.response.status,
      status_code: err.response.status,
      status_message: err.response.statusText
    };
  }
};

module.exports = {
  requestHandler
};
