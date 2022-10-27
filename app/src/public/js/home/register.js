"use strict"

// 컨트롤러의 id에 해당되는 태그 리퀘스트 : document.querySelector (DOM)
const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    pw = document.querySelector("#pw"),
    cpw = document.querySelector("#cpw"),
    registerBtn = document.querySelector("#button");

// 버튼이 클릭됐을 때 이벤트 register 함수 실행
registerBtn.addEventListener("click", register);

function register(){
    const req = {
        id : id.value,
        name : name.value,
        pw : pw.value,
        cpw : cpw.value,

    };
    console.log(req);

    //fetch API : 서버로 데이터 전송
        //router.post("/register", ctrl.process.register);
    
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href="/login";
        }else{
            alert(res.msg)
        }
    })
    .catch((err)=> {
        console.error(new Error("회원가입 중 에러 발생"));
    });

}