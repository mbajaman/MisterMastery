$(document).ready(function(){
    console.log("JQuery works!");
    $.get("/test").then(function(resp){
        console.log(resp);
    })
});