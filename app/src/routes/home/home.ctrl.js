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
};

// 원하는 기능 처리 
const process = {
    login : (req, res) =>{
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);  // res로 클라언트에게 리턴
    },
};

module.exports = {
    output, 
    process
};