# Rune Forge
Submission for Riot Games API Challenge 2017

### Introduction
Rune forge allows you to look up recent games and analyze your runes and provide advice based on champion, playstyle and team composition. Look up various recommended trees that suits your playstyle from building Resolve to stand and dance in the enemy team or to use Domination to make the enemy ADCs life hell.
At Rune forge you will be able to not only learn about the Rune system in League of Legends but also see how it compares to the older Runes to help educated returning players

### How to setup
- Make sure `node.js` is installed on the system (as well PATH variables are updated). https://nodejs.org/en/download/

- After downloading the zip file and extracting the contents, run `npm install`

- Create a file called `config.js` in the root directory (same folder as `index.js` and type the following inside it:
    ~~~~
    var config = {
        "MY_KEY" : "<YOUR_API_KEY_HERE>"
    }
    module.exports = config;
    ~~~~
- Open `cmd` and type `node index.js` to start the server.

- The website can be opened by opening a web browser and typing the following in the address bar:
`localhost:9000`

- You are good to go!!

### Workflow
Users enter their summoner name and the next page shows information from their last 20 games complete with the result of the game, teammate's and opponent's champions played as well as Runes you selected (while giving information on what the Rune does.
After deciding on a game to analyze, the User gets the choice to see recommendation based on team composition or based on champion. (Based on playstyle hasn't been looked into too deeply for now).
Selecting based on team comp will show the champion roles in the team that currently exist, such as, Assassin, Fighter, Support, Mage, etc. The recommeneded runes for the game come up for the role that is missing, in this tank, where the user will be shown the Resolve tree as the primary rune and suggest multiple others for the secondary rune tree.
Based on champion shows common Runes for the role, example: Assassin would most likely be Domination as the primary Rune tree.

### Technology Used
I mostly stuck to what I know best with my year long experience and instead took the opportunity to learn how to deal with large APIs as well as learn about Rate limiting, caching, etc. 
The project uses Node.js and express for the server side and HTML / JS for client side. I also use a package called webpack that allows me to directly add jQuery to my Javascript files without having to use a library link in all my files. This also helps with the fact that people can't go through to my script easily even if they open up inspect (by having jquery packed with the script the file has almost 10000 lines).
I figured i could use SpringBoot Baeldung (having recently learnt it) to create a much more secure server but I didn't have the time as I VERY recently found out about this challenge. 
I also use a package called axios for making the requests to the API (just to try it out, it's one of many out there that are pretty cool to use and support a bunch of browsers.

### Problems faced / Lessons learnt
I almost comitted my API key to this repository and later had to research a whole bunch on hiding API keys and using environemtn variables, etc. Although I did not use these methods, I simply created another file called `config.js` that held my key, exported it and used that on my server. 
My gut tells me this isn't the MOST secure way to do it when deploying to a live server, but it serves its purpose for the submission.

### Goal
Althought this project is FAR from complete and barely has anything working, I hope that it ignites ideas in some developers and hopefully use the idea to create something even better. ( I don't even have the recommendations working right now T_T ). As I've been told, you improve with experience, and this has certainly been a great experience :).