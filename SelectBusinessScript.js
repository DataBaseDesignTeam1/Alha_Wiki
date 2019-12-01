$(document).ready(function(){
    $('#CategoryName').append(localStorage.getItem("BigCategory") + "-" +localStorage.getItem("SmallCategory") + "(" +localStorage.getItem("State") + ", "+localStorage.getItem("City") +")" );
    $('.BusinessItem').click(function(){
        var string = this.getElementsByClassName("BusinessName")[0].innerText;;
        console.log(string);
        localStorage.setItem("Business", string);
        location.href = "AlbaWiki.html";
        //ajax로 통신해서, 값 가지고 오기
    });


});