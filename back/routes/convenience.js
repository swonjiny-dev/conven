const express = require('express');
const logger =  require('../config/logger');
const router = express.Router();
const controller = require('../controller/product');
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

module.exports = router;