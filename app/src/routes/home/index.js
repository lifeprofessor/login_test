"use strict";
// 홈 컨트롤러의 함수 실행

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.post("/login", ctrl.process.login);  //fetch("/login",{method: "POST",}


module.exports = router;