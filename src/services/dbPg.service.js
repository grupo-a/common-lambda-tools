'use strict';

//
// dependecies
const xray = require('../configs/xray.config');
const pg   = xray.loadPG();

const noopIdentityCheck = () => {};

class DbPgService {
  constructor(DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT, POOL_MAX = 1, POOL_MIN = 0, POOL_IDLE = 10000, POOL_TIMEOUT = 10000, options = {}) {
    const pgConfig = {
      database                : DB_DATABASE,
      user                    : DB_USER,
      password                : DB_PASSWORD,
      host                    : DB_HOST,
      port                    : DB_PORT,
      max                     : POOL_MAX,
      min                     : POOL_MIN,
      idleTimeoutMillis       : POOL_IDLE,
      connectionTimeoutMillis : POOL_TIMEOUT,
      connection              : null,
      ...options
    };

    if (process.env.DB_ENABLE_SSL === 'true') {
      pgConfig.ssl = {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }

      if (process.env.DB_SSL_DISABLE_IDENTITY_CHECK === 'true') {
        pgConfig.ssl.checkServerIdentity = noopIdentityCheck;
      }
    }

    this.poolDB = new pg.Pool(pgConfig);
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

  async startTransaction() {
    if (this.poolDB.connection) {
      await this.poolDB.connection.query('BEGIN');
    }
  };

  async commit() {
    if (this.poolDB.connection) {
      await this.poolDB.connection.query('COMMIT');
    }
  };

  async rollback() {
    if (this.poolDB.connection) {
      await this.poolDB.connection.query('ROLLBACK');
    }
  };
}

module.exports = {
  DbPgService
};
