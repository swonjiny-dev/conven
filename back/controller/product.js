/**
 * 편의점 상품정보 컨트롤러
 * @author swonjiny.dev@gmail.com
 */

const ProductModel =  require('../models/product');

class ProductController{
  /**
   * 상품정보 목록 조회
   * @param brand{array} 브랜드
   * @param category{array} 삼품카테고리
   * @param eventType{array} 1+1 2+1 3+1
   * @param title{String} 상품명
   * @param size{number} 목록갯수
   * @param offset{number} 목록시작 위치
   * @param order{array} 정렬
   * @return promise.<list>
   */
  static async readProductList(brand , category , eventType , title , size , offset,order){
    return ProductModel.getProdList(brand , category , eventType , title , size , offset,order);
  }
}

module.exports = ProductController;