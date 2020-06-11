/**
 * 디비 연결설정 - 편의점 수집및 상품카테고리 분류정보디비
 * 개발환경 ,  운영환경에 대한 디비설정값 dotenv 에서 정보를 가져오고 적용한다.
 * @author swonjiny.dev@gmail.com
 * @date  2020-05-00
 */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_CONVEN_DEV,
    password: process.env.DB_PASSWORD_CONVEN_DEV,
    database: process.env.DB_DATABASE_CONVEN_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: 'mysql',
    timezone: "+09:00",
    pool : {
      max : 30,
      min : 0 ,
      idle: 30000
    }
  },
  production: {
    username: process.env.DB_USERNAME_CONVEN_PROD,
    password: process.env.DB_PASSWORD_CONVEN_PROD,
    database: process.env.DB_DATABASE_CONVEN_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: 'mysql',
    timezone: "+09:00",
    pool : {
      max : 30,
      min : 0 ,
      idle: 30000
    }
  }
};