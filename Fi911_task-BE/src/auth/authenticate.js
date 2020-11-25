const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
var mysqlLib = require('../config/mysqlLib');

// const { User } = require('../sequelizeDBConfig')
const Auth = {

  async verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    // decode token
    if (!token) {
      // if there is no token
      // return an error
      return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
      });
    }
    const decoded = await jwt.verify(token, config.secret);
    mysqlLib.getConnection(function (err, mclient) {
      var sql = `SELECT * FROM Users WHERE user_id != \'${decoded.user_id}\' AND soft_delete=False`
      mclient.query(sql, function (err, rows) {
        if (err) throw err;
        console.log("User Authentication Success");
        next();
      });
    });
  }
}

module.exports = Auth