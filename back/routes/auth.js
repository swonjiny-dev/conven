const express = require('express');
const logger =  require('../config/logger');
const router = express.Router();
const authController = require('../controller/auth');
const jwt = require('../utils/auth');

// 로그인처리방식중 - jwt 토큰 요청일경우
router.post('/getAuthKey' , authController.getAuthKey);

// 신규 사용자추가  - !! 서비스별 관리자등급추가 개발해야한다!!!!!
router.post('/createUser',authController.createUser);


module.exports = router;