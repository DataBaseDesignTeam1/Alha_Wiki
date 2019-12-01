$(document).ready(function(){
    //통신해서 값 가지고 오고 후기 있는것만큼 후기 html만들어주기
    var dumpData = [ {'star' : "7"},{'star' : "9"},{'star' : "5"},{'star' : "4"},{'star' : "4"},{'star' : "4"},{'star' : "4"},{'star' : "4"},{'star' : "4"},{'star' : "4"}];
    addPost(dumpData);
    $('#CategoryName').append(localStorage.getItem("BigCategory")+localStorage.getItem("SmallCategory") + "(" +localStorage.getItem("State") + ", "+localStorage.getItem("City") +"-"+localStorage.getItem("Business")+")");
    $(".star").on('click',function(){
        var idx = $(this).index();
        console.log($(".star"));
        console.log(idx);
        $(".star").removeClass("on");
          for(var i=0; i<=idx; i++){
             $(".star").eq(i).addClass("on");
        }
      });
      function addPost(data){
        for(var i = 0; i< data.length ; i++){

            addPostedStar(data[i].star);
        }
      }
      function addPostedStar(star){
        $('.Post').append(' <div class = "PostItem">  <div class="star-box"> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> 후기 2</div></div>');
        var temp = $('.star-box').last()[0];
        for(var i=0; i<=star; i++){
          $(temp.getElementsByClassName("stared")).eq(i).addClass("on");
        }
      }
    });