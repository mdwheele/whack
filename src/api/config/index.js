require('dotenv').config()

module.exports = {
  database: {   
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD,
    name: process.env.MYSQL_DATABASE || 'whack'
  }
}