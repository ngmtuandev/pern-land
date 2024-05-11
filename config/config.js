// docs :  The .sequelizerc file

require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        timezone: '+07:00'
      },
}

//  config.json

// {
//     "development": {
//       "username": "postgres",
//       "password": "Manhtuan123***",
//       "database": "land",
//       "host": "127.0.0.1",
//       "dialect": "postgres",
//       "logging": false,
//       "timezone": "+07:00"
//     },
//     "test": {
//       "username": "root",
//       "password": null,
//       "database": "database_test",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     },
//     "production": {
//       "username": "root",
//       "password": null,
//       "database": "database_production",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     }
//   }
  