$(document).ready(function(){
    var seoul = ["동작구", "동대문구", "종로구"];
    var incheon = ["중구", "동구" ,"미추홀구", "연수구", "남동구"]
    var busan = ["강서구", "금정구", "북구", "동래구", "해운대구"]
    var deajean =["유성구", "대덕구", "대둑구", "서구", "중구", "동구"];
    var flag = "0";
    $('#IdCheck').click(function(){
        var allData = {  
            id: $('#Id').val(), 
           };
        //    console.log(allData)
          var tmp = JSON.stringify(allData);
          $.ajax({
              type:"POST",
              url: "http://localhost:4000/signup",
              data: tmp,
              contentType  : "application/json",
              cache : false,
              processData: false,
              success: function (data) {
                  console.log(data);
                  if(data == "1"){
                      alert("사용가능한 아이디 입니다.");
                      flag = "1";
                  }else{
                      alert("사용 불가능한 아이디입니다.");
                  }
              },error:function(data){
                  alert("error");
              }
          }); 
    });
    $('#SignUpBtn').click(function(){
        if(flag == "1"){
            var allData = {  
                id: $('#Id').val(), 
                pw: $('#Password').val(), 
                age: $('#Age').val(), 
                name : $('#Name').val(),
                state: $('#state').val(),   
                city : $('#city').val()
               };
            //    console.log(allData)
              var tmp = JSON.stringify(allData);
              $.ajax({
                  type:"POST",
                  url: "http://localhost:4000/enroll_member",
                  data: tmp,
                  contentType  : "application/json",
                  cache : false,
                  processData: false,
                  success: function (data) {
                  },error:function(data){
                      alert("error");
                  }
              }); 
            location.href = "http://localhost:4000/login";
        }else {
            alert("회원 가입 불가능 합니다. 로그인 조회를 눌러 주세요");
        }
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
  
});