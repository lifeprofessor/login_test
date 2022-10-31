"use strict";
const User = require("../../models/User");
const logger = require("../../config/logger");


// 홈페이지 리다이렉트
const output = {
    home: (req, res) =>{
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index");
    },
    
    login: (req, res) =>{
        logger.info(`GET / login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },
    register: (req, res)=>{
        logger.info(`GET / register 304 "회원가입 화면으로 이동"`);
        res.render("home/register")
    },    
};

// 원하는 기능 처리 
const process = {
    login : async(req, res) =>{
        const user = new User(req.body);
        const response = await user.login();    // 비동기 처리
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };
        log(response, url);
        return res.status(url.status).json(response);  // res로 클라언트에게 리턴
       
    },
    register : async(req, res) =>{
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 409 : 201,
        };
        log(response, url);

        return res.status(url.status).json(response);  // res로 클라언트에게 리턴
    },
};

const log =(response, url)=>{
    if(response.err){
        logger.error(`${url.method} ${url.path} ${url.status} Response: " ${response.success}, ${response.err}`)
    } else{
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: " ${response.success}, ${response.msg || ""}`
        );
    }
}

module.exports = {
    output, 
    process
};