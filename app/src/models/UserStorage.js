"use strict";

const fs = require('fs').promises;  // promises로 값을 리턴받기 위해서 설정

class UserStorage{

    // 변수가 n개인 경우 사용법
    static getUsers(...fields){
        // const users = this.#users;
        const newUsers = fields.reduce((newUsers, field)=> {
            if(users.hasOwnProperty(field)){
                // hasOwnPorperty - 키 값이 있는지 확인
                newUsers[field] = users[field];
            }
            return newUsers;    // 누적된 값 리턴
        }, {});
        return newUsers;
    }

    static getUserInfo(id){
        // const users = this.#users;          // users private변수 사용
        
        return fs.readFile("./src/databases/users.json")
          .then((data)=>{
            return this.#getUserInfo(data, id);
          })
          .catch(console.error);

    }

    static #getUserInfo(data, id){
        const users = JSON.parse(data);
            const idx = users.id.indexOf(id);   // users의 id값에 해당하는 인덱스
            const userKeys = Object.keys(users);// users의 키값 받음
            
            const userInfo = userKeys.reduce((newUser, info)=>{ // idx에 해당하는 id의 데이터 받음
                newUser[info] = users[info][idx];
                return newUser;
            }, {});
            return userInfo;
    }

    static save(userInfo){
        return {success : true};

    }

}

module.exports = UserStorage;