/**
 * 유저정보 jwt 토큰처리, 사용자정보처리
 * @author swonjiny.dev@gmail.com
 */

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const logger =  require('../config/logger');
const saltRounds = 10;

dotenv.config();
const expiresIn = 60 * 10 ; //  10분
//algorithm (default: HS256)
const auth = {
  // 키값생성
  getToken(id) {
    return new Promise((resolve) => resolve(jwt.sign({ id }, process.env.PRIVATE_KEY, { expiresIn })));
  },

  // 패스워드 확인
  async passCompare(inpassWord , dbpassWord ){
    try {
      return await bcrypt.compare(inpassWord, dbpassWord);
    } catch (error) {
      logger.error(error);
      throw Error('사용자확인 문제');
    }
  },

  // 해시 키생성
  async getHashPass(password){
    try {
      const hash = await bcrypt.hash(password,saltRounds);
      return hash;
    } catch (error) {
      logger.error(error);
      throw Error('비밀번호 생성이상');
    }
  }
}

module.exports = auth;