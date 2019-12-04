$(document).ready(function(){
    var city = localStorage.getItem("City");
    var state = localStorage.getItem("State");
    var allData = {"state":state, "city":city};
    var tmp = JSON.stringify(allData);
    var url = location.href;
    console.log(tmp);
    $.ajax({
        type:"POST",
        url: url,
        data: tmp,
        contentType  : "application/json",
        cache : false,
        processData: false,
        success: function (data) {
            console.log("매장 정보:",data);   
        },error:function(data){
            alert("error");
        }
    });

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
        console.log(this.getElementsByClassName("BusinessName"));
        var string = this.getElementsByClassName("BusinessName")[0].innerText;;
        console.log(string);
        localStorage.setItem("Business", string);
        // location.href = "AlbaWiki.html";
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