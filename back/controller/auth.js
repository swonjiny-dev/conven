/**
 * 유저정보 인증 등 관련 기능 컨트롤러
 * @author swonjiny.dev@gmail.com
 */
const UserModel = require('../service/user');
const logger =  require('../config/logger');
const auth = require('../utils/auth');

class AuthController{
  /**
   * 사용자 조회
   * @param {string} email 이메일 아이디
   * @param {string} password 패스워드
   * @return promise.<user>
   */
  static async getUser(email){
    return UserModel.getUser(email);
  }
  /**
   * jwt 토큰방식 인증 - jwt 토큰 제공
   * @param {Request} req
   * @param {Response} res
   */
  static async getAuthKey(req , res){
    try {
      const {email , password} = req.body;
      const user = await UserModel.getUser(email);
      if(!user) return res.status(501).json({message : '사용자 정보에 문제가 있습니다.'});
      const flag =  await auth.passCompare(password , user.password);
      if(flag) {
        const authToken = await auth.getToken(email);
        user.password = null;
        res.json({authToken , user});
      }else {
        res.status(501).json({message : '입력한정보에 문제가 있습니다.'})
      }

    } catch (error) {
      logger.error(error);
      res.status(501).json({message : '인증키발급에 문제가 있습니다.'})
    }
  }

  /** 
   * 사용자추가
   * @param {Request} req
   * @param {Response} res
   */
  static async createUser(req , res){
    try {
      const {email , name , password} = req.body;
      const hashPassword = await auth.getHashPass(password);
      const userArr = await UserModel.createUser(email , name ,hashPassword );
   
      if(!userArr[1]){
        return res.status(501).json({message : '이미 등록된 사용자 입니다.'});
      }

      res.json({message : 'ok'});
    } catch (error) {
      logger.error(error);
      res.status(501).json({message : '사용자 추가에 문제.'});
    }
  }
}

module.exports = AuthController;