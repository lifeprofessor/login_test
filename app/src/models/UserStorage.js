"use strict";

const db = require("../config/db");

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
        
    }

    static getUserInfo(id){
        // Promise 안에 구문이 성공하면 resolve실행, 실패하면 reject 실행
        return new Promise((resolve, reject)=>{
            db.query("select * from users where id = ?", [id], (err, data)=>{
                if(err) reject(err);
                resolve(data[0]);   // 배열로 전달되므로 배열로 1개의 객체만 보냄
            });
        });
    }

    static async save(userInfo){
    }

}

module.exports = UserStorage;