/**
 * 트위치 스트리머 정보 서버스 모델 -- 예정 ) 스트리머 팔로워 시청수 관련 기능추가
 */

const db = require('../models/index');
const logger = require('../config/logger');

class StreamerModel{
   /**
   * 상품정보목록조회
   * @param name{string} 스트리머이름
   * @return promise.<list>
   */
  static async getStreamerList(name){
    try {
      const list = await db.Streamer.findAll({
        where : {
          userName : {
            [db.Sequelize.Op.like] : `%${name}%`
          }
        }
      });      
      return list;
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = StreamerModel;