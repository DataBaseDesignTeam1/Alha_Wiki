$(document).ready(function(){
    $('#BigCategoryName').append(localStorage.getItem("BigCategory") + "(" +localStorage.getItem("State") + ", "+localStorage.getItem("City") +")");
    $('.SmallCategoryItem').click(function(){
        var string = this.innerHTML.trim();
        
        localStorage.setItem("SmallCategory", string);
        location.href = "SelectBusiness.html";
        //ajax로 통신해서, 값 가지고 오기
    });


});