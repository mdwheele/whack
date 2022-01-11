require('dotenv').config()

module.exports = {
  cookie: {
    secret: process.env.COOKIE_SECRET
  },
  mysql: {   
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'whack',
    test_database: 'whack_test',
    port: process.env.MYSQL_PORT || 3306
  },
  paseto: {
    private: process.env.PASETO_PRIVATE_KEY,
    public: process.env.PASETO_PUBLIC_KEY
  },
  server: {
    hostname: process.env.SERVER_HOSTNAME || 'whack.chat',
    port: process.env.SERVER_PORT || 443
  }
}