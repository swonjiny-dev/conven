/**
 * 상품정보조회 서버스 모델
 */

const db = require('../models/index');
const logger = require('../config/logger');

class ProductModel{
  /**
   * 상품정보목록조회
   * @param brand{array} 브랜드
   * @param category{array} 삼품카테고리
   * @param eventType{array} 1+1 2+1 3+1
   * @param title{String} 상품명
   * @param size{number} 목록갯수
   * @param offset{number} 목록시작 위치
   * @param order{array} orderby 정렬조건
   * @return promise.<list>
   */
  static async getProdList(brand , category , eventType , title , size , offset, orderby){    
    try {
      // 시퀄라이져 where 객체
      let whereObject = {};
      let order = [];

      if(brand) {
        whereObject.brand = {
          [db.Sequelize.Op.or] : brand
        };
      }

      if(category) {
        whereObject.category = {
          [db.Sequelize.Op.or] : category
        };
      }

      if(eventType){
        whereObject.eventType = {
          [db.Sequelize.Op.or] : eventType
        };
      } 
      
      if(title) {
        whereObject.title = {
          [db.Sequelize.Op.like] : `%${title}%`, 
        };
      }
      if(orderby){
        order = [orderby]
      }else order = [];
    
      const list = await db.Product.findAndCountAll({
       where  : whereObject,
       offset,
       limit : size,
       order
      });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }

  /**
   * 상품정보수정
   * @param brand{array} 브랜드
   * @param category{array} 삼품카테고리
   * @param eventType{array} 1+1 2+1 3+1
   * @param title{String} 상품명

   * @return promise.<void>
   */
  static async updateProd(id , category , brand , eventType , title ){       
    try {
      const item = await db.Product.findOne(
        { where : {id}}
      );
      if(brand) {
        item.brand = brand;
      }

      if(category) {
        item.category =  category
      }

      if(eventType){
        item.eventType = eventType
      } 
      
      if(title) {
        item.title = title
      }
      
      await item.save();
      return true;
      
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

}

module.exports = ProductModel;