$(document).ready(function(){ 
    $('#MainTitle').click(() => {
        location.href = "http://localhost:4000/";
    });

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
        },error:function(data){
            alert("error");
        }
    });
    function addMyReviewList(data){
        var MyReviewList = data.my_review_data;
        console.log(MyReviewList);
        for(var i = 0; i < MyReviewList.length ; i++){
            $('.MyReviewList').append('<div class="MyReviewItem" value="'+MyReviewList[i].business_index+'"  style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="BusinessName">'+MyReviewList[i].business_name+'</div><br> <div class="Content">'+MyReviewList[i].content+'</div><br> <div class="writeDate">'+MyReviewList[i].write_date+'</div> </div>');
        }
    }

});