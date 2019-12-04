$(document).ready(function(){
    $('#LoginBtn').click(function(){
        var Id = $('#Id').val();
        localStorage.setItem("UserId",Id);
        //window.history.back();
        location.href = localStorage.getItem("URL");
    });
    $('#SignUpBtn').click(function(){
        //location.href = "SignUp.html";
    });
});