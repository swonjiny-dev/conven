/**
 * 사용자 정보 서버스 모델
 */

const db = require('../models/index');
const logger = require('../config/logger');

class UserModel{
  /**
   * 사용자 조회
   * @param email{string} 이메일 아이디
   * @return promise.<user>
   */
  static async getUser(email){
    try {
      const user = await db.User.findOne({
        where : { email }
      });      
      return user;
    } catch (error) {
      logger.error(error);
    }
  }
  /**
   * 신규사용자 생성
   * @param {String} email 이메일 아이디
   * @param {String} name 닉네임
   * @param {String} password 비밀번호
   * @return promise.<[user , created]>
   */
  static async createUser(email , name , password){
    try {
      const reArr = await db.User.findOrCreate({
        where : {
          email
        },
        defaults : {
          name , password
        }
      })
      console.log(reArr);
      
      return reArr;
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = UserModel;