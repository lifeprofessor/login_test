"use strict";

class UserStorage{
    static #users = {   // #은 private의 의미 -> 은닉화
        id: ["warmars87", "warmars"],
        pw: ["1234","1234"],
        name: ["성민", "예정"],
    };

    // 변수가 n개인 경우 사용법
    static getUsers(...fields){
        const users = this.#users;
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
        const users = this.#users;          // users private변수 사용
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