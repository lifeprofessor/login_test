"use strict"

// 컨트롤러의 id에 해당되는 태그 리퀘스트 : document.querySelector (DOM)
const id = document.querySelector("#id"),
    pw = document.querySelector("#pw"),
    loginBtn = document.querySelector("#button");

// 버튼이 클릭됐을 때 이벤트 login 함수 실행
loginBtn.addEventListener("click", login);

function login(){
    console.log('button click');
    const req = {
        id : id.value,
        pw : pw.value,
    };

    // fetch API : 서버로 데이터 전송
        // router.post("/login", ctrl.process.login);
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href="/";
        }else{
            alert(res.msg)
        }
    })
    .catch((err)=> {
        console.error(new Error("로그인 중 에러 발생"));
    });

}