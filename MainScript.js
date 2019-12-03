$(document).ready(function(){
    var seoul = ["동작구", "동대문구", "종로구"];
    var incheon = ["중구", "동구" ,"미추홀구", "연수구", "남동구"]
    var busan = ["강서구", "금정구", "북구", "동래구", "해운대구"]
    var deajean =["유성구", "대덕구", "대둑구", "서구", "중구", "동구"];

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
    $('.BigCategoryItem').click(function(){
        var string = this.innerHTML.trim();
        //ajax로 통신해서, 값 가지고 오기
        console.log(string);
        localStorage.setItem("BigCategory", string);
        localStorage.setItem("State", $("#state option:selected").text());
        localStorage.setItem("City", $("#city option:selected").text());
        location.href = "SelectCategory.html";
    });
    $("#state").change(function() {
        var state = $(this).val();
        $("#city option").remove();
        $("#city").append("<option value='1'>구/군 선택</option>");
        if(state == "Seoul"){
            for(var i = 0 ; i< seoul.length ; i++){
                $("#city").append("<option>"+seoul[i] +"</option>");
            }
        }else if (state == "Incheon"){
            for(var i = 0 ; i< incheon.length ; i++){
                $("#city").append("<option >"+incheon[i] +"</option>");
            }
        }else if (state == "Busan"){
            for(var i = 0 ; i< busan.length ; i++){
                $("#city").append("<option>"+busan[i] +"</option>");
            }
        }else if (state == "Deajean"){
            for(var i = 0 ; i< deajean.length ; i++){
                $("#city").append("<option>"+deajean[i] +"</option>");
            }
        }
    });
    $('#Login').click(function(){
        localStorage.setItem('beforeLoginPage',"Main.html");
        location.href = "login.html";
    });
    $('#LogOut').click(function(){
       localStorage.removeItem("UserId");
       changLoginBtn("");
    })
    $(document).on("click","#Login",function(){
        localStorage.setItem('beforeLoginPage',"Main.html");
        location.href = "login.html";
    });
    $('#RecommandSection').click(function(){
        UserId = localStorage.getItem("UserId");
        if(UserId == "" || UserId == null){
           alert("Login 후 이용해주세요!");
        }else{
            location.href = "RecommandAlba.html";
        }
    });

});