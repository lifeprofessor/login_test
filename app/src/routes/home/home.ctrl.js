"use strict";
const User = require("../../models/User");

// 홈페이지 리다이렉트
const output = {
    home: (req, res) =>{
        res.render("home/index");
    },
    
    login: (req, res) =>{
        res.render("home/login");
    },
    register: (req, res)=>{
        res.render("home/register")
    },    
};

// 원하는 기능 처리 
const process = {
    login : async(req, res) =>{
        const user = new User(req.body);
        const response = await user.login();    // 비동기 처리
        return res.json(response);  // res로 클라언트에게 리턴
    },
    register : (req, res) =>{
        const user = new User(req.body);
        const response = user.register();
        return res.json(response);  // res로 클라언트에게 리턴
    }
};

module.exports = {
    output, 
    process
};