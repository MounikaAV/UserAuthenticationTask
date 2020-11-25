const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()

const port = 8000;
const config = require('./src/config/config.json')
var Auth = require('./src/auth/authenticate')
const Sequelize = require('sequelize')
const queries = require('./src/queries')

var authRouter = require('./src/controllers/auth');

var userRouter = require('./src/controllers/user');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)

app.use('/user', Auth.verifyToken,  userRouter)

app.listen(port, () => {
  console.log(`Listening Port ${port}` )
})

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: config.DB_HOST,
  // user: 'taskTestUser',
  // password: 'Fi911.TestUser',
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`);
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_DATABASE}\`;`, function (err, result) {
    if (err) throw err;
    if (result) console.log("Database created");
  });
  connection.query(queries.CREAT_TABLE, function (err, result) {
    if (err) throw err;
    if (result) console.log("Table created");
  });
});
