$(document).ready(function(){
    $('#LoginBtn').click(function(){
        var Id = $('#Id').val();
        localStorage.setItem("UserId",Id);
        var URL = localStorage.getItem("beforeLoginPage");
        //window.history.back();    
        location.href = URL;
    });
    $('#SignUpBtn').click(function(){
        //location.href = "SignUp.html";
        location.href = "http://localhost:4000/signup";
    });
});