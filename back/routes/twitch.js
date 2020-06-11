const express = require('express');
const logger =  require('../config/logger');
const router = express.Router();
const controller = require('../controller/twitch');
// 상품정보목록 조회
router.get('/list/:name', async(req , res, next)=>{
  try {    
    const list = await controller.getStreamerList(req.params.name);
    res.json(list);
  } catch (error) {
    console.error(error);
    logger.error(error);
    next(error);
  }
})

module.exports = router;