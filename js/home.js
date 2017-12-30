$(document).ready(function(){
    console.log("JQuery works!");
    document.getElementById("summBut").addEventListener("click", function(){
        $.ajax({
           url:"/summoner",
            type:"post",
            data:{
                sname: document.getElementById("sname").value,
            },
            success: function(resp){
                console.log(resp);
                location.href="/"+resp.name;
            }
        });
//        $.get("/test").then(function(resp){
//            console.log(resp);
//        });
    })
    
});