var CREAT_TABLE = `CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    soft_delete BOOLEAN NOT NULL DEFAULT FALSE,
    registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_date TIMESTAMP,
    updated_date TIMESTAMP
  )  ENGINE=INNODB`

module.exports = { CREAT_TABLE: CREAT_TABLE };