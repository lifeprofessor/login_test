"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body){  // 생성자
        this.body = body;
    }
    
    login(){
        const client = this.body;
        // getUsers메서드는 id, pw를 객체로 리턴
        const {id, pw} = UserStorage.getUserInfo(client.id);

        // id 정보 판별
        if(id){
            if(id === client.id && pw === client.pw){
                return { success : true}
            }
            return {success : false, msg: "비번이 달라요"};            
        }
        return {success : false, msg: "존재하지 않는 아이디입니다."};        

    }

    register(){
        const client = this.body;
        const response = UserStorage.save(client)
        return response;
    }
}

module.exports = User;