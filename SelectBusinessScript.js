$(document).ready(function(){


    var UserId = localStorage.getItem("UserId");
    changLoginBtn(UserId);
    function changLoginBtn(UserId){
        if(UserId == "" || UserId == null){
            $('#UserId').remove();
            $('#MainHeader').prepend(' <div id = "UserId"><button id = "Login">로그인</button></div>');
        }else{
            $('#Login').remove();
            $('#MainHeader').prepend('<div id = "UserId"> User Id :'+ UserId+ '<button id = "LogOut">로그아웃</button></div>');
        }
    }

    $('#CategoryName').append(localStorage.getItem("BigCategory") + "-" +localStorage.getItem("SmallCategory") + "(" +localStorage.getItem("State") + ", "+localStorage.getItem("City") +")" );
    $('.BusinessItem').click(function(){
        var string = this.getElementsByClassName("BusinessName")[0].innerText;;
        console.log(string);
        localStorage.setItem("Business", string);
        location.href = "AlbaWiki.html";
        //ajax로 통신해서, 값 가지고 오기
    });
    $('#Login').click(function(){
        localStorage.setItem('beforeLoginPage',"SelectBusiness.html");
        location.href = "login.html";
    });
    $('#LogOut').click(function(){
        localStorage.removeItem("UserId");
        changLoginBtn("");
     })
     $(document).on("click","#Login",function(){
        localStorage.setItem('beforeLoginPage',"SelectBusiness.html");
         location.href = "login.html";
     });
});