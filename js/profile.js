$(document).ready(function(){
    console.log("JQuery works!");
    //Using promises to make concurrent requests
    $.post("/profileIcon")
        .then(getProfileIcon)
        .then(matchList)
        .then(matchInfo);
});

// Adds icon to div element from ddragon. Returns promise for matchList
function getProfileIcon(resp){
    var iconDiv = document.getElementById("profilePic")
    iconDiv.style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/7.24.2/img/profileicon/" + resp.iconID + ".png')";
    iconDiv.style.height = '100px';
    iconDiv.style.width = '100px';
    iconDiv.style.backgroundSize = 'contain'

    return $.post("/recentMatchList");
};

//Testing purposes. Remove later
function matchList(resp){
    var games = []; //Array to store Champion ID and game ID
    for(var i=0; i<5; i++){
        console.log(resp.matches[i].gameId + "\n CHAMPION ID: " + resp.matches[i].champion);
        games.push({gameId: resp.matches[i].gameId, champion: resp.matches[i].champion});
    }
    
    return $.post("/matchInfo", {games});
};

// Gets Runes for last game played and displays image and description for rune setup
function matchInfo(resp){
    var runeDiv = document.getElementById("runes");
    var containerDiv = document.getElementById("container");
    var participantId; // User's ID in the particular game
    var runes = {
        primaryRuneTree: '0',
        secondaryRuneTree: '0',
        perk0: '0',
        perk1: '0',
        perk2: '0',
        perk3: '0',
        perk4: '0',
        perk5: '0'
    }
    
    //For loop to find Summoner's particpantID in the game, later used to get perks/Runes
    for(var i=0; i<resp.info.participantIdentities.length; i++){
        if(resp.info.participantIdentities[i].player.summonerName == resp.name){
            participantId = resp.info.participantIdentities[i].participantId
        }
    }
    
    // Loop to create perk/Rune IDs, later used to fetch icons and description
    for(var i=0; i<resp.info.participants.length; i++){
        if(resp.info.participants[i].participantId == participantId){
            runes.primaryRuneTree = resp.info.participants[i].stats.perkPrimaryStyle;
            runes.secondaryRuneTree = resp.info.participants[i].stats.perkSubStyle;
            runes.perk0 = resp.info.participants[i].stats.perk0;
            runes.perk1 = resp.info.participants[i].stats.perk1;
            runes.perk2 = resp.info.participants[i].stats.perk2;
            runes.perk3 = resp.info.participants[i].stats.perk3;
            runes.perk4 = resp.info.participants[i].stats.perk4;
            runes.perk5 = resp.info.participants[i].stats.perk5;
        }
    }
    
    $.post("/runeData")
    .then(function(resp){
        console.log(resp);
        
    //Loop for primary rune tree to get Icons and Descriptions
    for(var i=0; i<resp.length; i++){
        if(resp[i].id == runes.primaryRuneTree){
            var primaryRuneImage = document.createElement("img");
            primaryRuneImage.src = resp[i].icon;
            runeDiv.appendChild(primaryRuneImage);
            // Loop for each slot in primary tree [4]
            for(var j=0; j<4; j++){
                // Loop for each rune in slot [3]
                for(var k=0; k<3; k++){
                    if(resp[i].slots[j].runes[k].id == runes.perk0){
                        addImageDescription(resp[i].slots[j].runes[k].icon, resp[i].slots[j].runes[k].longDesc);
                        };
                    if(resp[i].slots[j].runes[k].id == runes.perk1){
                        addImageDescription(resp[i].slots[j].runes[k].icon, resp[i].slots[j].runes[k].longDesc);
                        };
                    if(resp[i].slots[j].runes[k].id == runes.perk2){
                        addImageDescription(resp[i].slots[j].runes[k].icon, resp[i].slots[j].runes[k].longDesc);
                        };
                    if(resp[i].slots[j].runes[k].id == runes.perk3){
                        addImageDescription(resp[i].slots[j].runes[k].icon, resp[i].slots[j].runes[k].longDesc);
                        };
                    }
                }
            };
        }
        
    //Loop for secondary rune tree after primary tree is loaded
    for(var i=0; i<resp.length; i++){
        if(resp[i].id == runes.secondaryRuneTree){
            var secondaryRuneImage = document.createElement("img");
            secondaryRuneImage.src = resp[i].icon;
            runeDiv.appendChild(secondaryRuneImage);
            for(var j=0; j<4; j++){
                for(var k=0; k<3; k++){
                    if(resp[i].slots[j].runes[k].id == runes.perk4){
                        addImageDescription(resp[i].slots[j].runes[k].icon, resp[i].slots[j].runes[k].longDesc);
                        };
                    if(resp[i].slots[j].runes[k].id == runes.perk5){
                        addImageDescription(resp[i].slots[j].runes[k].icon, resp[i].slots[j].runes[k].longDesc);
                        };
                    };
                };
            };
        };
    });
};

//Function to add icon and description to profile.html
function addImageDescription (icon, description){
    var containerDiv = document.getElementById("container");
    var runeSlotDiv = document.createElement("div");
    var runeImg = document.createElement("img");
    runeImg.src = icon;
    runeSlotDiv.appendChild(runeImg);
    runeSlotDiv.innerHTML += "<br/>" +  description;
    containerDiv.appendChild(runeSlotDiv);
};