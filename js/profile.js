$(document).ready(function(){
    console.log("JQuery works!");
    $.post("/profileIcon")
        .then(getProfileIcon)
        .then(matchList)
        .then(matchInfo);
});

function getProfileIcon(resp){
    console.log("Icon ID:" + resp.iconID);
    var iconDiv = document.getElementById("profilePic")
    iconDiv.style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/7.24.2/img/profileicon/" + resp.iconID + ".png')";
    iconDiv.style.height = '100px';
    iconDiv.style.width = '100px';
    iconDiv.style.backgroundSize = 'contain'

    return $.post("/recentMatchList");
}

function matchList(resp){
    var games = []
    for(var i=0; i<5; i++){
        console.log(resp.matches[i].gameId + "\n CHAMPION ID: " + resp.matches[i].champion);
        games.push({gameId: resp.matches[i].gameId, champion: resp.matches[i].champion});
    }
    
    console.log(games);
    
    return $.post("/matchInfo", {games});
}

function matchInfo(resp){
    console.log(resp);
    var runeDiv = document.getElementById("runes");
    var containerDiv = document.getElementById("container");
    var participantId;
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
    
    for(var i=0; i<resp.info.participantIdentities.length; i++){
        if(resp.info.participantIdentities[i].player.summonerName == resp.name){
            participantId = resp.info.participantIdentities[i].participantId
        }
    }
    
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
    console.log(runes)
    
    $.post("/runeData")
    .then(function(resp){
        console.log(resp);
        for(var i=0; i<resp.length; i++){
            if(resp[i].id == runes.primaryRuneTree){
                var primaryRuneImage = document.createElement("img");
                primaryRuneImage.src = resp[i].icon;
                runeDiv.appendChild(primaryRuneImage);
                for(var j=0; j<4; j++){
                    var slotDiv = document.createElement("div");
                    for(var k=0; k<3; k++){
                        if(resp[i].slots[j].runes[k].id == runes.perk0){
                                var runeSlotDiv = document.createElement("div");
                                var runeImg = document.createElement("img");
                                runeImg.src = resp[i].slots[j].runes[k].icon;
                                runeSlotDiv.appendChild(runeImg);
                                runeSlotDiv.innerHTML += "<br/>" +  resp[i].slots[j].runes[k].longDesc;
                                containerDiv.appendChild(runeSlotDiv);
                            }
                        if(resp[i].slots[j].runes[k].id == runes.perk1){
                                var runeSlotDiv = document.createElement("div");
                                var runeImg = document.createElement("img");
                                runeImg.src = resp[i].slots[j].runes[k].icon;
                                runeSlotDiv.appendChild(runeImg);
                                runeSlotDiv.innerHTML += "<br/>" +  resp[i].slots[j].runes[k].longDesc;
                                containerDiv.appendChild(runeSlotDiv);
                            }
                        if(resp[i].slots[j].runes[k].id == runes.perk2){
                                var runeSlotDiv = document.createElement("div");
                                var runeImg = document.createElement("img");
                                runeImg.src = resp[i].slots[j].runes[k].icon;
                                runeSlotDiv.appendChild(runeImg);
                                runeSlotDiv.innerHTML += "<br/>" +  resp[i].slots[j].runes[k].longDesc;
                                containerDiv.appendChild(runeSlotDiv);
                            }
                        if(resp[i].slots[j].runes[k].id == runes.perk3){
                                var runeSlotDiv = document.createElement("div");
                                var runeImg = document.createElement("img");
                                runeImg.src = resp[i].slots[j].runes[k].icon;
                                runeSlotDiv.appendChild(runeImg);
                                runeSlotDiv.innerHTML += "<br/>" + resp[i].slots[j].runes[k].longDesc;
                                containerDiv.appendChild(runeSlotDiv);
                        }
                    }
                }
            };
            if(resp[i].id == runes.secondaryRuneTree){
                var secondaryRuneImage = document.createElement("img");
                secondaryRuneImage.src = resp[i].icon;
                runeDiv.appendChild(secondaryRuneImage);
                for(var j=0; j<4; j++){
                    var slotDiv = document.createElement("div");
                    for(var k=0; k<3; k++){
                        if(resp[i].slots[j].runes[k].id == runes.perk4){
                            var runeSlotDiv = document.createElement("div");
                            var runeImg = document.createElement("img");
                            runeImg.src = resp[i].slots[j].runes[k].icon;
                                runeSlotDiv.appendChild(runeImg);
                                runeSlotDiv.innerHTML += "<br/>" +  resp[i].slots[j].runes[k].longDesc;
                            containerDiv.appendChild(runeSlotDiv);
                        }
                        if(resp[i].slots[j].runes[k].id == runes.perk5){
                            var runeSlotDiv = document.createElement("div");
                            var runeImg = document.createElement("img");
                            runeImg.src = resp[i].slots[j].runes[k].icon;
                                runeSlotDiv.appendChild(runeImg);
                                runeSlotDiv.innerHTML += "<br/>" +  resp[i].slots[j].runes[k].longDesc;
                            containerDiv.appendChild(runeSlotDiv);
                        }
                    }
                }
            }
        }
    });
}