const express = require("express");
const port = process.env.PORT || 9000;
const path = require("path");
const axios = require('axios');
var config = require("./config");

var app = express();
const server = require("http").createServer(app);
var pF = path.resolve(__dirname, "public");

app.use("/scripts", express.static("build"));
app.get("/", function(req, resp){
    resp.sendFile(pF+"/index.html");
});

app.get("/test", function(req, resp){
axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=' + config.MY_KEY)
  .then(response => {
    resp.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

server.listen(port, function(err){
    if(err){
        console.log("Error: "+err);
    }
    
    console.log("Port is running " + port);
});