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
            console.log(data);
            addbusinessList(data);   
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
    function addbusinessList(data){
        var businesses = data.data;
        for(var i = 0; i < businesses.length ; i++){
            if(i%3 == 0){
                $('#BusinessTable').append('<div class="BusinessList"> <div class="BusinessItem" value="'+businesses[i].business_index+'"  style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="BusinessName">'+businesses[i].business_name+'</div> <div class="FullAddress">'+businesses[i].business_detail_address+'</div> </div>');
            }else if(i%3 == 1){
                var idx = parseInt(i/3);
                 $($('.BusinessList')[idx]).append('<div class="BusinessItem" value="'+businesses[i].business_index+'" style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="BusinessName">'+businesses[i].business_name+'</div> <div class="FullAddress">'+businesses[i].business_detail_address+'</div> </div>');
            }else{
                var idx = parseInt(i/3);
                 $($('.BusinessList')[idx]).append('<div class="BusinessItem" value="'+businesses[i].business_index+'" style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="BusinessName">'+businesses[i].business_name+'</div> <div class="FullAddress">'+businesses[i].business_detail_address+'</div> </div>');
            }
        }
      
    }
    $(document).on("click",".BusinessItem",function(){
        var string = this.getElementsByClassName("BusinessName")[0].innerText;
        var temp = $(this).attr("value");
        var tempURL = location.href;
        localStorage.setItem("Business", string);
        console.log(tempURL, temp);
        location.href = tempURL + "/" + temp;
    });
    $('#CategoryName').append(localStorage.getItem("BigCategory") + "-" +localStorage.getItem("SmallCategory") + "(" +localStorage.getItem("State") + ", "+localStorage.getItem("City") +")" );
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