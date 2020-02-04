'use strict';
//
// dependecies
const xray  = require('../configs/xray.config');
const pg    = xray.loadPG();

class DbPgAccess {
  constructor(DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT) {
    this.poolDB = new pg.Pool({
      database                : DB_DATABASE,
      user                    : DB_USER,
      password                : DB_PASSWORD,
      host                    : DB_HOST,
      port                    : DB_PORT,
      max                     : 1,
      min                     : 0,
      idleTimeoutMillis       : 120000,
      connectionTimeoutMillis : 10000
    });
  }

  closeConnection = (connection) => {
    connection.release(true);
  };

  executeQuery = (query, params = [], connection) => {
    return connection.query(query, params)
    .then(result => {
      return result.rows;
    });
  };

  openConnection = async () => {
    return await this.poolDB.connect();
  };
}

module.exports = {
  DbPgAccess
};