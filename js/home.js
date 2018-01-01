$(document).ready(function(){
    document.getElementById("summBut").addEventListener("click", function(){
        
        //Call to return summoner information
        $.ajax({
           url:"/summoner",
            type:"post",
            data:{
                sname: document.getElementById("sname").value,
            },
            success: function(resp){
                console.log(resp); //Remove console.log
                location.href="/"+resp.name;
            }
        });
    });
});