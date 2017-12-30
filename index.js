const express = require("express");
const port = process.env.PORT || 9000;
const path = require("path");
const axios = require('axios');
const bodyParser = require("body-parser");
const session = require("express-session");
var config = require("./config");

var app = express();
const server = require("http").createServer(app);
var pF = path.resolve(__dirname, "public");

var rF = path.resolve(__dirname, ".")

app.use("/scripts", express.static("build"));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(session({
    secret:"i don't know what to type here", //for cookie handling, type anything
    resave:"true",
    saveUninitialized: true
}));

app.get("/", function(req, resp){
    resp.sendFile(pF+"/index.html");
});
app.get("/assets/runeReforged/perkStyle/:imagename", function(req,resp){
    resp.sendFile(pF + "/assets/runeReforged/perkStyle/" + req.params.imagename);
})
app.get("/assets/runeReforged/perk/:imagename", function(req,resp){
    resp.sendFile(pF + "/assets/runeReforged/perk/" + req.params.imagename);
})

app.post("/summoner", function(req, resp){
axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + req.body.sname + '?api_key=' + config.MY_KEY)
  .then(response => {
    req.session.iconID = response.data.profileIconId;
    req.session.summonerID = response.data.id;
    req.session.summonerName = response.data.name;
    req.session.accountId = response.data.accountId
    resp.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});
app.get("/:summonerName", function(req,resp){
    resp.sendFile(pF+"/profile.html")
})
app.post("/profileIcon", function(req,resp){
    resp.send({
        iconID: req.session.iconID
    });
});
app.post("/recentMatchList", function(req,resp){
    axios.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + req.session.accountId + '/recent?api_key=' + config.MY_KEY)
    .then(response => {
        resp.send(response.data);
    })
    .catch(error => {
        console.log(error);
    });
})
app.post("/matchInfo", function(req,resp){
    axios.get('https://na1.api.riotgames.com/lol/match/v3/matches/' + req.body.games[0].gameId + '?api_key=' + config.MY_KEY)
    .then(response => {
        resp.send({
            info: response.data,
            name: req.session.summonerName
        });
    });
});
app.post("/runeData", function(req,resp){
    resp.sendFile(rF + "/ddragon-runes-reforged.json");
});

server.listen(port, function(err){
    if(err){
        console.log("Error: "+err);
    }
    
    console.log("Port is running " + port);
});