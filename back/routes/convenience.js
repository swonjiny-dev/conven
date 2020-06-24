// !!!!!!!! 에러처리 핸들러 개발후 소스 변경 해야함!!!!!!!!
// !!!!!!에러처리 공통헬퍼로(github 찾아보면 자바랑 틀리게 helper 로 네이밍 한 소스들이 많음) 만들고 boiler plate 프로젝트에 옮겨!!!!!!
// !!!!!! 로그처리관련 재정리후 boiler plate 프로젝트에 옮겨!!!!!!
const express = require('express');
const logger =  require('../config/logger');
const router = express.Router();
const authMiddle = require('../middleware/auth');
const controller = require('../controller/product');
const auth = require('../utils/auth');

// 상품정보목록 조회
router.post('/list', async(req , res, next)=>{
  try {    
    let brand = [], category = [], eventType = [], title = '', size = 10, offset=0, order;

    if(Array.isArray(req.body.brand)){
      brand = req.body.brand;
    }else if(req.body.brand){
      brand.push(req.body.brand);
    }

    if(Array.isArray(req.body.category)){
      category = req.body.category;
    }else if(req.body.category){
      category.push(req.body.category);
    }

    if(Array.isArray(req.body.eventType)){
      eventType = req.body.eventType;
    }else if(req.body.eventType){
      eventType.push(req.body.eventType);
    }

    title = req.body.title;
    if(req.body.size) size = Number(req.body.size);
    if(req.body.offset) offset = Number(req.body.offset);
    console.log(req.body.order);
    
    if(req.body.order) {
      if(req.body.order==='낮은가격순')order = ['price','asc'];
      if(req.body.order==='높은가격순')order = ['price','desc'];
    }

    const list = await controller.readProductList(brand , category , eventType , title , size , offset, order);

    // ex) count : 1200 , rows : [{id:1,brand:gs,title:콜드브루,price:2000 , imgeUrl : ~~, eventType : "1+1" , category : "식품"  }]
    res.json(list);
  } catch (error) {
    console.error(error);
    logger.error(error);
    next(error);
  }
})

// 상품정보수정 - 카테고리정보만 수정
router.patch('/category/:id', async(req , res, next)=>{
  try { 
    
    let category  =  req.body.category;
    //const authToken = await auth.getToken(req.user.id);

    if(await controller.updateProduct(req.params.id, category)){
      //res.json({authToken});
      res.send('ok')
    }else next(new Error('수정되지 않았음')); 
  } catch (error) {
    console.error(error);
    logger.error(error);
    next(error);
  }
})

module.exports = router;