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
            console.log(data);   
        },error:function(data){
            alert("error");
        }
    });

});