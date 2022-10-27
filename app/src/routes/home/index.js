"use strict";
// 홈 컨트롤러의 함수 실행

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');
// 홈페이지 리다이렉트
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

// 원하는 기능 처리
router.post("/login", ctrl.process.login);  //fetch("/login",{method: "POST",}
router.post("/register", ctrl.process.register);


module.exports = router;