"use strict";

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const logger = require("./src/config/logger");

const dotenv = require("dotenv");

const app = express();
dotenv.config();


// 라우팅
const home = require("./src/routes/home");
// 로그파일 저장할 스트림 생성
//const accessLogStream = require("./src/config/log");

// 앱 세팅 ( 미들웨어 등록 )
app.set("views", "./src/views");
app.set("view engine", "ejs");  // ejs 세팅
app.use(express.static(`${__dirname}/src/public`)); // 폴더 설정
app.use(bodyParser.json()) // body-parser가 json을 사용할 수 있도록 설정
app.use(morgan("tiny", { stream: logger.stream }));


// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

module.exports = app;

