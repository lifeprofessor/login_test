"use strict";

const db = require("../config/db");

class UserStorage{
    
    // 유저 정보 DB검색 후 Promise로 리턴
    static getUserInfo(id){
        // Promise 안에 구문이 성공하면 resolve실행, 실패하면 reject 실행
        return new Promise((resolve, reject)=>{
            const query = "select * from users where id = ?;";
            db.query(query, [id], (err, data)=>{
                if(err) reject(`${err}`);
                resolve(data[0]);   // 배열로 전달되므로 배열로 1개의 객체만 보냄
            });
        });
    }

    static async save(userInfo){
        return new Promise((resolve, reject)=>{
            const query = "insert into users(id, pw, name) values(?, ?, ?);";
            db.query(
                query, 
                [userInfo.id, userInfo.pw, userInfo.name], 
                (err)=>{
                if(err) reject(`${err}`);
                resolve({success : true});   // 배열로 전달되므로 배열로 1개의 객체만 보냄
            });
        });
    }

}

module.exports = UserStorage;