//Require packages
const express = require("express");
const port = process.env.PORT || 9000; //determines which port to run on
const path = require("path");
const axios = require('axios');
const bodyParser = require("body-parser");
const session = require("express-session"); //stores session data in cookies
var config = require("./config"); //Gets API key from config.js

//Initialize server
var app = express();
const server = require("http").createServer(app);

//Define project file paths
var pF = path.resolve(__dirname, "public");
var rF = path.resolve(__dirname, ".") //should change this to a directory (this is giving access to all files in root :( )

/*********** APP.USE() ************/

//Points the /scripts location to  the build folder
app.use("/scripts", express.static("build"));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(session({
    secret:"i don't know what to type here", //for cookie handling, type anything
    resave:"true",
    saveUninitialized: true
}));

/************ App.get methods to return html files/images/etc ************/

//Returns index.html (home page)
app.get("/", function(req, resp){
    resp.sendFile(pF+"/index.html");
}); 

//Returns images from ./public/assets folder
app.get("/assets/runeReforged/perkStyle/:imagename", function(req,resp){
    resp.sendFile(pF + "/assets/runeReforged/perkStyle/" + req.params.imagename);
});

//Returns images from ./public/assets folder
app.get("/assets/runeReforged/perk/:imagename", function(req,resp){
    resp.sendFile(pF + "/assets/runeReforged/perk/" + req.params.imagename);
});

//Loads profile page for the summoner name typed at index.html
app.get("/:summonerName", function(req,resp){
    resp.sendFile(pF+"/profile.html")
});


/************ App.post methods to return data from API calls ************/

//Returns summoner information and stored it in session (cookies)
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

//Sends the iconID(session) to front end to retrieve from ddragon
app.post("/profileIcon", function(req,resp){
    resp.send({
        iconID: req.session.iconID
    });
});

//Returns list of last 20 matches played by the summoner
app.post("/recentMatchList", function(req,resp){
    axios.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + req.session.accountId + '/recent?api_key=' + config.MY_KEY)
    .then(response => {
        resp.send(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});

//Currently returns match data(based on gameId) on only one match for testing purposes.
app.post("/matchInfo", function(req,resp){
    axios.get('https://na1.api.riotgames.com/lol/match/v3/matches/' + req.body.games[0].gameId + '?api_key=' + config.MY_KEY)
    .then(response => {
        resp.send({
            info: response.data,
            name: req.session.summonerName
        });
    });
});

//Sends Rune data which includes images and description. This file is local on server and isn't fetched online.
app.post("/runeData", function(req,resp){
    resp.sendFile(rF + "/ddragon-runes-reforged.json");
});

//Listen to server
server.listen(port, function(err){
    if(err){
        console.log("Error: "+err);
    }
    
    console.log("Port is running " + port);
});