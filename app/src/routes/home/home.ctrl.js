"use strict";
const UserStorage = require("../../models/UserStorage");
const { unsubscribe } = require(".");

const output = {
    home: (req, res) =>{
        res.render("home/index");
    },
    
    login: (req, res) =>{
        res.render("home/login");
    },    
};

const process = {
    login : (req, res) =>{
        console.log('---서버에 전송된 내용---');    
        const id = req.body.id,
            pw=req.body.pw;

        const users = UserStorage.getUsers("id","pw"); //static 메서드라 접근가능

        console.log(id, pw);

        const response={};
        
        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.pw[idx]=== pw){
                 response.success = true;
                 return res.json(response)
            }
        }
        response.success = false;
        response.msg = "로그인에 실패했습니다.";
        return res.json(response);
    },
};

module.exports = {
    output, 
    process
};