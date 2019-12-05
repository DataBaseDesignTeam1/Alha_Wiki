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
            $('.MyReviewList').append('<div class="MyReviewItem" value="'+ MyReviewList[i].big_category_index +'/'+MyReviewList[i].small_category_index +'/'+ MyReviewList[i].business_index+ '"  style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="businessState">'+MyReviewList[i].state+'</div><div class="businessCity">'+MyReviewList[i].city+'</div><div class="BusinessName" big ="'+MyReviewList[i].big_category_name+'" small="'+MyReviewList[i].small_category_name+'">'+MyReviewList[i].business_name+'</div> <div class="writeDate">'+MyReviewList[i].write_date+'</div><div class="star-box"> <span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span></div></div>');
            var temp = $('.star-box').last()[0];
            for(var j=0; j<=MyReviewList[i].star_point; j++){
              $(temp.getElementsByClassName("stared")).eq(j).addClass("on");
            }
        }
    }
    function addOhterReviwList(data){
        var OhterReviewList = data.recommand_data;
        for(var i = 0; i < OhterReviewList.length ; i++){
            $('.OhterReviewList').append('<div class="OtherReviewItem" value="'+ OhterReviewList[i].big_category_index +'/'+OhterReviewList[i].small_category_index +'/'+ OhterReviewList[i].business_index+ '"  style="float: none; color : #FFFFFF; font-weight:bold;"><div class="Number">'+(i+1)+'</div> <div class="businessState">'+OhterReviewList[i].state+'</div><div class="businessCity">'+OhterReviewList[i].city+'</div><div class="BusinessName" big ="'+OhterReviewList[i].big_category_name+'" small="'+OhterReviewList[i].small_category_name+'">'+OhterReviewList[i].business_name+'</div> <div class="writeDate">'+OhterReviewList[i].write_date+'</div><div class="star-box"><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span><span class="stared star_left"></span><span class="stared star_right"></span></div>');
            var temp = $('.star-box').last()[0];
            for(var j=0; j<=OhterReviewList[i].star_point; j++){
              $(temp.getElementsByClassName("stared")).eq(j).addClass("on");
            }
        }
        console.log(OhterReviewList);
    }
      $(document).on("click",".MyReviewItem",function(){
        var MyReviewItem = $(this).children();
        var state = MyReviewItem[1].innerText;
        var city = MyReviewItem[2].innerText;
        var business = MyReviewItem[3].innerText;
        var big_category = $(MyReviewItem[3]).attr('big');
        var small_category =  $(MyReviewItem[3]).attr('small');

        localStorage.setItem('State',state);
        localStorage.setItem('City',city);
        localStorage.setItem('Business',business);
        localStorage.setItem('BigCategory',big_category);
        localStorage.setItem('SmallCategory',small_category);
        
        var subURL = $(this).attr("value");
        var URL = "http://localhost:4000/category/" + subURL;
            location.href = URL;
    });
    $(document).on("click",".OtherReviewItem",function(){
        var OhterReviewList = $(this).children();
        var state = OhterReviewList[1].innerText;
        var city = OhterReviewList[2].innerText;
        var business = OhterReviewList[3].innerText;
        var big_category = $(OhterReviewList[3]).attr('big');
        var small_category =  $(OhterReviewList[3]).attr('small');

        localStorage.setItem('State',state);
        localStorage.setItem('City',city);
        localStorage.setItem('Business',business);
        localStorage.setItem('BigCategory',big_category);
        localStorage.setItem('SmallCategory',small_category);
        
        var subURL = $(this).attr("value");
        var URL = "http://localhost:4000/category/" + subURL;
            location.href = URL;
    });
    function addPostedStar(star){
        $('.OhterReviewItem').append(' <div class = "PostItem">  <div class="star-box"> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> 후기 2</div></div>');
        var temp = $('.star-box').last()[0];
        for(var i=0; i<=star; i++){
          $(temp.getElementsByClassName("stared")).eq(i).addClass("on");
        }
      }

});