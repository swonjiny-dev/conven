/**
 * 디비 연결설정 - 트위치 스트리머 정보 수집디비
 * @author swonjiny.dev@gmail.com
 * @date  2020-05-00
 */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_TWITCH_DEV,
    password: process.env.DB_PASSWORD_TWITCH_DEV,
    database: process.env.DB_DATABASE_TWITCH_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: 'mysql',
    timezone: "+09:00",
    pool : {
      max : 10,
      min : 0 ,
      idle: 30000
    }
  },
  production: {
    username: process.env.DB_USERNAME_TWITCH_PROD,
    password: process.env.DB_PASSWORD_TWITCH_PROD,
    database: process.env.DB_DATABASE_TWITCH_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: 'mysql',
    timezone: "+09:00",
    pool : {
      max : 10,
      min : 0 ,
      idle: 30000
    }
  },
};