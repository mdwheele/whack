require('dotenv').config()

module.exports = {
  mysql: {   
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'whack',
    port: process.env.MYSQL_PORT || 3306
  }
}