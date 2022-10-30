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
    if(!id.value)  
        return alert('아이디를 입력 바랍니다.');    
    if(!pw.value || !cpw.value)  
        return alert('비밀번호 입력 바랍니다.');
    if(pw.value !== cpw.value)   
        return alert('비밀번호가 일치하지 않습니다');
    
// 아이디 입력했고 및 비번이 맞는 경우
    const req = {
        id : id.value,
        name : name.value,
        pw : pw.value,    
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
            alert(res.msg);
            location.href="/login";
        }else{
            if(res.err) return alert(res.err);            
            alert(res.msg)
        }
    })
    .catch((err)=> {
        console.error(new Error("회원가입 중 에러 발생"));
    });

}