'use strict';
//
// dependecies
const xray = require('../configs/xray.config');
const pg   = xray.loadPG();

class DbPgService {
  constructor(DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT, POOL_MAX = 1, POOL_MIN = 0, POOL_IDLE = 10000, POOL_TIMEOUT = 10000) {
    this.poolDB = new pg.Pool({
      database                : DB_DATABASE,
      user                    : DB_USER,
      password                : DB_PASSWORD,
      host                    : DB_HOST,
      port                    : DB_PORT,
      max                     : POOL_MAX,
      min                     : POOL_MIN,
      idleTimeoutMillis       : POOL_IDLE,
      connectionTimeoutMillis : POOL_TIMEOUT,
      connection              : null
    });
  };

  closeConnection () {
    if (this.poolDB.connection) {
      this.poolDB.connection.release(true);
    }
  };

  executeQuery (query, params = []) {
    return this.poolDB.connection.query(query, params)
    .then(result => {
      return result.rows;
    });
  };

  async openConnection () {
    this.poolDB.connection = await this.poolDB.connect();
  };
}

module.exports = {
  DbPgService
};