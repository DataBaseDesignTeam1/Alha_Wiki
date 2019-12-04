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

    // $('#BigCategoryName').append(localStorage.getItem("BigCategory") + "(" +localStorage.getItem("State") + ", "+localStorage.getItem("City") +")");

    $('#BigCategoryName').append("(" + localStorage.getItem("State") + ", " + localStorage.getItem("City") + ")");

    $('.SmallCategoryItem').click(function(){
        var string = this.innerHTML.trim();
        
        localStorage.setItem("SmallCategory", string);
        // location.href = "SelectBusiness.html";
        //ajax로 통신해서, 값 가지고 오기
    });
    $('#Login').click(function(){
        var URL = document.location.href;
        localStorage.setItem('beforeLoginPage',URL);
        location.href = "http://localhost:4000/login";
    });
    $('#LogOut').click(function(){
        localStorage.removeItem("UserId");
        changLoginBtn("");
     })
     $(document).on("click","#Login",function(){
        var URL = document.location.href;
        localStorage.setItem('beforeLoginPage',URL);
        location.href = "http://localhost:4000/login";
     });
     $('#MainTitle').click(() => {
        location.href = "http://localhost:4000/";
    });
});