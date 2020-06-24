const jwt = require('jsonwebtoken');
const logger =  require('../config/logger');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const auth = {
  ensureAuth(req , res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        logger.error(`인증키가 존재하지 않음 - ${req.ip}` );
        res.status(401);
        throw Error('인증키에 문제');
      }
      // 디비조회후 연계 ?  decoded 값으로
      req.user = jwt.verify(authorization.replace(/^Bearer\s/, ''), process.env.PRIVATE_KEY);
      next();
    } catch (error) {
      logger.error(`인증키처리중 문제가 있습니다.- ${req.ip}` );
      res.status(501);
      throw Error('인증키에 문제');
    }
  },
  verify(token) {
    jwt.verify(token.replace(/^Bearer\s/, ''), process.env.PRIVATE_KEY , (err , decode)=>{
      if(err){
        logger.error(`인증키에 문제가 있습니다.- ${req.ip} - ${err.name} - ${err.message}` );
        res.status(501);
        throw Error(err.message);
      }
      return decode;
    });
  }
}

module.exports = auth;