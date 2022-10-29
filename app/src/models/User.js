"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body){  // 생성자
        this.body = body;
    }
    
    async login(){
        const client = this.body;
        // getUsers메서드는 id, pw를 객체로 리턴

        // await은 promise의 pending(다 못받음)을 처리해줌
            // await은 async 함수에서만 사용 가능, 비동기 처리
        try{
            const {id, pw} = await UserStorage.getUserInfo(client.id); 

            // id 정보 판별
            if(id){
                if(id === client.id && pw === client.pw){
                    return { success : true}
                }
                return {success : false, msg: "비번이 달라요"};            
            }
            return {success : false, msg: "존재하지 않는 아이디입니다."};        
        }catch(err){
            return {success: false, msg: err};
        }
        

    }

    async register(){
        const client = this.body;
        try{
            const response = await UserStorage.save(client)
            return response;
        }catch(err){
            return { success: false, msg: err};
        }
    }
}

module.exports = User;