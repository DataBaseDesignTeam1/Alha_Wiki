$(document).ready(function(){
    $('#LoginBtn').click(function(){
        var id = $('#Id').val();
        var password = $('#Password').val();
        var allData = {"id":id, "password":password};
        var tmp = JSON.stringify(allData);
        console.log(tmp);
        $.ajax({
            type:"POST",
            url: 'http://localhost:4000/login',
            data: tmp,
            contentType  : "application/json",
            cache : false,
            processData: false,
            success: function (data) {
                if(data == "1"){
                    console.log("로그인 완료");
                    localStorage.setItem("UserId",id);
                    var URL = localStorage.getItem("beforeLoginPage");
                    //window.history.back();    
                    location.href = URL;
                }else{
                    console.log("로그인 실패");
                }  
            },error:function(data){
                alert("error");
            }
        });
    });
    $('#SignUpBtn').click(function(){
        //location.href = "SignUp.html";
        location.href = "http://localhost:4000/signup";
    });
    $('#IdCheck').click(function(){

    });
});