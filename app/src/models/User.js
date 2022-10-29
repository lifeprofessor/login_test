"use strict";
const logger = require("../config/logger");

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
            // id 정보 판별
            if(!isEmpty(client.id) && !isEmpty(client.pw)){
                // db에서 값을 못불러오면 undefinded가 리턴되므로 {,} 구조분해할당 안됨
                const user = await UserStorage.getUserInfo(client.id);
                logger.info("DB로 로그인 id 검색");
                if(user){
                    if(user.id===client.id && user.pw === client.pw){
                        return {success : true, msg: "로그인 환영합니다."};
                    }
                    return {success : false, msg: "비밀번호가 틀렸습니다."};
                }
                return { success : false, msg: "존재하지 않는 아이디입니다."}
            }else if(isEmpty(client.id)){
                // 사용자가 아이디 입력 안한 경우
                return {success : false, msg: "아이디를 입력해주세요."};
            }else if(isEmpty(client.pw)){
                return {success : false, msg: "비밀번호를 입력해주세요."};
            }         

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

var isEmpty = function(value){
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
      return true;
    }else{
      return false;
    }
};

module.exports = User;