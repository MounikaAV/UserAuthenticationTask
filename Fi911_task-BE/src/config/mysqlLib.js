var mysql = require("mysql");
// var pool = mysql.createPool(/* credentials go here */);
const config = require('./config.json')
const pool = mysql.createPool({
    host: config.DB_HOST,
    // user: 'taskTestUser',
    // password: 'Fi911.TestUser',
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
  });
exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    console.log("DB Connected")
    callback(err, conn);

  });
};