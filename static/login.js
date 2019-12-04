$(document).ready(function(){
    $('#LoginBtn').click(function(){
        var Id = $('#Id').val();
        localStorage.setItem("UserId",Id);
        var URL = localStorage.getItem("URL");
        //window.history.back();
        location.href = URL;
    });
    $('#SignUpBtn').click(function(){
        //location.href = "SignUp.html";
    });
});