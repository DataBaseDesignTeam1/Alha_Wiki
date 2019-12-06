

$(document).ready(function () {
  var UserId = localStorage.getItem("UserId");
  changLoginBtn(UserId);
  function changLoginBtn(UserId) {
    if (UserId == "" || UserId == null) {
      $('#UserId').remove();
      $('#MainHeader').prepend(' <div id = "UserId"><button id = "Login">로그인</button></div>');
    } else {
      $('#Login').remove();
      $('#Wiki').removeAttr('readonly');
      $('#URL').removeAttr('readonly');
      $('#MainHeader').prepend('<div id = "UserId"> User Id :' + UserId + '<button id = "LogOut">로그아웃</button></div>');
    }
  }
  //통신해서 값 가지고 오고 후기 있는것만큼 후기 html만들어주기

  $('#CategoryName').append(localStorage.getItem("BigCategory") + localStorage.getItem("SmallCategory") + "(" + localStorage.getItem("State") + ", " + localStorage.getItem("City") + "-" + localStorage.getItem("Business") + ")");
  $(".star").on('click', function () {
    var star_point = $(this).index();
    // console.log($(".star"));
    // console.log(idx);
    $(".star").removeClass("on");
    for (var i = 0; i <= star_point; i++) {
      $(".star").eq(i).addClass("on");
    }
  });

  // var dumpData = [{ 'star': "7" }, { 'star': "9" }, { 'star': "5" }, { 'star': "4" }, { 'star': "4" }, { 'star': "4" }, { 'star': "4" }, { 'star': "4" }, { 'star': "4" }, { 'star': "4" }];
  // addPost(dumpData);

  // function addPost(data) {
  //   for (var i = 0; i < data.length; i++) {

  //     addPostedStar(data[i].star);
  //   }
  // }
  // function addPostedStar(star) {
  //   $('.Post').append(' <div class = "PostItem">  <div class="star-box"> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> <span class="stared star_left"></span> <span class="stared star_right"></span> 후기 2</div></div>');
  //   var temp = $('.star-box').last()[0];
  //   for (var i = 0; i <= star; i++) {
  //     $(temp.getElementsByClassName("stared")).eq(i).addClass("on");
  //   }
  // }

  $('#Login').click(function () {
    var URL = document.location.href;
        localStorage.setItem('beforeLoginPage',URL);
        location.href = "http://localhost:4000/login";
  });
  $('#LogOut').click(function () {
    localStorage.removeItem("UserId");
    //$( '#Wiki' ).attr( 'readonly', 'readonly' );
    location.href =location.href;
    changLoginBtn("");
  })
  $(document).on("click", "#Login", function () {
    var URL = document.location.href;
    localStorage.setItem('beforeLoginPage',URL);
    location.href = "http://localhost:4000/login";
  });
  $('#UpdateTip').click(function(){
    if (UserId == "" || UserId == null) {
      alert("로그인 해주세요!!");
    } else {
      var Tip = $('#Wiki').val();
      var is_recruiting;
      var checkBox = document.getElementById("Recruit");
      if(checkBox.checked==true){
        is_recruiting = 1;
      }else{
        is_recruiting = 0;
      }
      var allData = { tip : Tip,
                      recruit_url: $('#URL').val(), 
                      is_recruiting : is_recruiting,
                      userId: localStorage.getItem('UserId'),
                      businessName: localStorage.getItem('Business') };
      var tmp = JSON.stringify(allData);
      $.ajax({
          type:"POST",
          url: "http://localhost:4000/update_tip",
          data: tmp,
          contentType  : "application/json",
          cache : false,
          processData: false,
          success: function (data) {
            location.href =location.href;  
          },error:function(data){
              alert("error");
          }
      });
    }
  });
  $('#MainTitle').click(() => {
    location.href = "http://localhost:4000/";
});
});

const review_content = $('#review_content');
const review_star_point = $('#review_star_point');
const review_write = document.getElementById('review_write');

review_write.addEventListener('click', async _ => {
  var UserId = localStorage.getItem("UserId");
  if (UserId == "" || UserId == null) {
      alert("로그인 해주세요!!");
    } else {
      var star_point;
        for(var i = 0 ; i<10; i++){
          console.log($($(".star")[i]).hasClass("on") );
          if($($(".star")[i]).hasClass("on") == false ){
            break;
          }
        } 
        star_point = i;
        console.log(star_point);
        var allData = {  
          content: review_content.val(), 
          star_point: star_point,
          userId: localStorage.getItem('UserId'),
          businessName: localStorage.getItem('Business')
        };
        console.log(allData);
        var tmp = JSON.stringify(allData);
        $.ajax({
            type:"POST",
            url: "http://localhost:4000/write_review",
            data: tmp,
            contentType  : "application/json",
            cache : false,
            processData: false,
            success: function (data) {
            },error:function(data){
                alert("error");
            }
        }); 
        location.href = location.href;
  }
  
});
