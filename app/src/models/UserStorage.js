"use strict";

class UserStorage{
    static #users = {   // #은 private의 의미 -> 은닉화
        id: ["warmars87", "warmars"],
        pw: ["1234","1234"],
        name: ["성민", "예정"],
    };

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
}

module.exports = UserStorage;