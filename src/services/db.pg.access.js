'use strict';
//
// dependecies
const xray  = require('../configs/xray');
const pg    = xray.loadPG();

//
// const
const DB_HOST     = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER     = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT     = process.env.DB_PORT;

const poolDB = new pg.Pool({
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

const closeConnection = (connection) => {
  connection.release(true);
};

const executeQuery = (query, params = []) => {
  return poolDB.connect()
    .then(connection => {
      return connection.query(query, params)
        .then(result => {
          return result.rows;
        })
        .finally(() => {
          connection.release(true);
        });
    });
};

const executeQueryWithConnection = (query, params = [], connection) => {  
  return connection.query(query, params)
    .then(result => {
      return result.rows;
    });
};

const openConnection = async () => {
  return await poolDB.connect();
};

module.exports = {
  closeConnection,
  executeQuery,
  executeQueryWithConnection,
  openConnection
};