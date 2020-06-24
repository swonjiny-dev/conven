/**
 * 트위치 관련 기능 컨트롤러
 * @author swonjiny.dev@gmail.com
 */

const StreamerModel =  require('../service/streamer');
const logger = require('../config/logger');
class TwitchController{
  /**
   * 상품정보 목록 조회
   * @param name{string} 스트리머 닉네임
   * @return promise.<list>
   */
  static async getStreamerList(name){
    try {
      return StreamerModel.getStreamerList(name);
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = TwitchController;