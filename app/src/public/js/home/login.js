"use strict"

// 컨트롤러의 id에 해당되는 태그 리퀘스트 : document.querySelector
const id = document.querySelector("#id"),
    psword = document.querySelector("#pw"),
    loginBtn = document.querySelector("#login");

// 버튼이 클릭됐을 때 이벤트 login 함수 실행
loginBtn.addEventListener("click", login);

function login(){
    const req = {
        id : id.value,
        pw : psword.value,
    };
    console.log(req);
}