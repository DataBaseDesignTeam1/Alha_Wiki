$(document).ready(function(){ 
    $('#MainTitle').click(() => {
        location.href = "http://localhost:4000/";
    });
    var city;
    var state;
    var business_name;
    var id = localStorage.getItem("UserId");
    var allData = { "id" : id };
    var tmp = JSON.stringify(allData);
    var url = location.href;
    console.log(tmp);
    $.ajax({
        type:"POST",
        url: "http://localhost:4000/recommand",
        data: tmp,
        contentType  : "application/json",
        cache : false,
        processData: false,
        success: function (data) {
            addMyReviewList(data); 
            addOhterReviwList(data);  
        },error:function(data){
            alert("error");
        }
    });
    function addMyReviewList(data){
        var MyReviewList = data.my_review_data;
        for(var i = 0; i < MyReviewList.length ; i++){
            $('.MyReviewList').append('<div class="MyReviewItem" value="'+ MyReviewList[i].big_category_index +'/'+MyReviewList[i].small_category_index +'/'+ MyReviewList[i].business_index+ '"  style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="businessState">'+MyReviewList[i].business_state+'</div><br><div class="businessCity">'+MyReviewList[i].business_city+'</div><div class="BusinessName">'+MyReviewList[i].business_name+'</div> <div class="writeDate">'+MyReviewList[i].write_date+'</div> </div>');
        }
    }
    function addOhterReviwList(data){
        var OhterReviewList = data.recommand_data;
        for(var i = 0; i < OhterReviewList.length ; i++){
            $('.OhterReviewList').append('<div class="OtherReviewItem" value="'+ OhterReviewList[i].big_category_index +'/'+OhterReviewList[i].small_category_index +'/'+ OhterReviewList[i].business_index+ '"  style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="BusinessName">'+OhterReviewList[i].business_name+'</div><br> <div class="Content">'+OhterReviewList[i].content+'</div><br> <div class="writeDate">'+OhterReviewList[i].write_date+'</div> </div>');
        }
        console.log(OhterReviewList);

    }
      $(document).on("click",".MyReviewItem",function(){
        var subURL = $(this).attr("value");
        var URL = "http://localhost:4000/category/" + subURL;
        location.href = URL;
    });
    $(document).on("click",".OtherReviewItem",function(){
        var subURL = $(this).attr("value");
        var URL = "http://localhost:4000/category/" + subURL;
        location.href = URL;
    });

});