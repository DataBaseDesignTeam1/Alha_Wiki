$(document).ready(function(){ 
  
    var allData = { };
    var tmp = JSON.stringify(allData);
    $.ajax({
        type:"GET",
        url: "http://localhost:4000/",
        data: tmp,
        contentType  : "application/json",
        cache : false,
        processData: false,
        success: function (data) {
            //console.log(data);   
        },error:function(data){
            alert("error");
        }
    }); 

    var seoul = ["동작구", "동대문구", "종로구"];
    var incheon = ["중구", "동구" ,"미추홀구", "연수구", "남동구"]
    var busan = ["강서구", "금정구", "북구", "동래구", "해운대구"]
    var deajean =["유성구", "대덕구", "대둑구", "서구", "중구", "동구"];
    var Big_Category=  ["매장관리", "서빙주방","서비스·미디어","생산·기능·운전·배달","사무회계","IT디자인", "고객상담·영업·리서치","강사교육"];

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
        for(var i = 0; i<Big_Category.length;i++)
        {
            if(string == Big_Category[i]){
                localStorage.setItem("BigCategory", string);
                console.log($("#state option:selected").val());
                if($("#state option:selected").val() != "" && "City", $("#city option:selected").val() != "" ){
                    localStorage.setItem("State", $("#state option:selected").text());
                    localStorage.setItem("City", $("#city option:selected").text());
                    location.href = "http://localhost:4000/category/" + i+"" ;
                }else{
                    alert("시/군 과 구/군을 선택해주세요");
                }
            }
        }
        
        // location.href = "SelectCategory.html";
    });
    $("#state").change(function() {
        var state = $(this).val();
        $("#city option").remove();
        $("#city").append("<option value=''>구/군 선택</option>");
        if(state == "Seoul"){
            for(var i = 0 ; i< seoul.length ; i++){
                $("#city").append("<option value ='1'>"+seoul[i] +"</option>");
            }
        }else if (state == "Incheon"){
            for(var i = 0 ; i< incheon.length ; i++){
                $("#city").append("<option value ='1' >"+incheon[i] +"</option>");
            }
        }else if (state == "Busan"){
            for(var i = 0 ; i< busan.length ; i++){
                $("#city").append("<option value ='1'>"+busan[i] +"</option>");
            }
        }else if (state == "Deajean"){
            for(var i = 0 ; i< deajean.length ; i++){
                $("#city").append("<option value ='1'>"+deajean[i] +"</option>");
            }
        }
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
    $('#RecommandSection').click(function(){
        UserId = localStorage.getItem("UserId");
        if(UserId == "" || UserId == null){
           alert("Login 후 이용해주세요!");
        }else{
            location.href = "RecommandAlba.html";
        }
    });
    $('#MainTitle').click(() => {
        location.href = "http://localhost:4000/";
    });
});