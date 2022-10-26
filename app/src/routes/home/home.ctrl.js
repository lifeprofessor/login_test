"use strict";

const { unsubscribe } = require(".");

const output = {
    home: (req, res) =>{
        res.render("home/index");
    },
    
    login: (req, res) =>{
        res.render("home/login");
    },    
};

const users = {
    id: ["warmars87", "warmars"],
    pw: ["1234","1234"],
};

const process = {
    login : (req, res) =>{
        console.log('---서버에 전송된 내용---');    
        const id = req.body.id,
            pw=req.body.pw;

        console.log(id, pw);

        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.pw[idx]=== pw){
                 return res.json({
                    success: true,
                 })
            }
        }

        return res.json({
            success: false,
            msg: "로그인에 실패했습니다.",
        });
    },
};

module.exports = {
    output, 
    process
};