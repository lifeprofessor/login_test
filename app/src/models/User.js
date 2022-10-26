"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body){  // 생성자
        this.body = body;
    }
    
    login(){
        const body = this.body;
        // getUsers메서드는 id, pw를 객체로 리턴
        const {id, pw} = UserStorage.getUserInfo(body.id);

        // id 정보 판별
        if(id){
            if(id === body.id && pw === body.pw){
                return { success : true}
            }
            return {success : false, msg: "비번이 달라요"};            
        }
        return {success : false, msg: "존재하지 않는 아이디입니다."};        

    }
}

module.exports = User;