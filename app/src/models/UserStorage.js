"use strict";

const fs = require('fs').promises;  // promises로 값을 리턴받기 위해서 설정

class UserStorage{
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

    static #getUsers(data, isAll, fields) {

        const users = JSON.parse(data); // 버퍼 데이터를 파싱해 JSON으로 변환
        if(isAll) return users;

        const newUsers = fields.reduce((newUsers, field)=> {
            if(users.hasOwnProperty(field)){
                // hasOwnPorperty - 키 값이 있는지 확인
                newUsers[field] = users[field];
            }
            return newUsers;    // 누적된 값 리턴
        }, {});
        return newUsers;
    }

    // 변수가 n개인 경우 사용법
    static getUsers(isAll, ...fields){
        // const users = this.#users;
        return fs.readFile("./src/databases/users.json")
          .then((data)=>{
            return this.#getUsers(data, isAll, fields);
          })
          .catch(console.error);

        
    }

    static getUserInfo(id){
        // const users = this.#users;          // users private변수 사용
        
        return fs.readFile("./src/databases/users.json")
          .then((data)=>{
            return this.#getUserInfo(data, id);
          })
          .catch(console.error);

    }

    static async save(userInfo){
        // 데이터 불러오기
        const users = await this.getUsers(true);
        console.log(users);
        // users.json에 없는 ID이면 데이터 추가
        if(users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다.";
        }else{
            users.id.push(userInfo.id);
            users.name.push(userInfo.name);
            users.pw.push(userInfo.pw);
            fs.writeFile('./src/databases/users.json', JSON.stringify(users));
            return {success : true, msg : '회원가입 감사합니다.'};
        }
    }

}

module.exports = UserStorage;