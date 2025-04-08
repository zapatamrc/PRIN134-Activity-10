const app = document.getElementById("app");

const container = document.createElement("div");
container.id = "main";
container.classList.add("container");
app.append(container);

const header = document.createElement("h2");
header.textContent = "NAME";
app.append(header);

const playersName = document.createElement("ul");
playersName.id = "players";
playersName.classList.add("player-list");
app.append(playersName);

const playerControl = document.createElement("div");
playerControl.id = "player-controls";
playerControl.classList.add("input-group", "mb-3");
document.getElementById("players").before(playerControl);

const footer = document.createElement("p");
footer.textContent = "Lesson 10: Manipulating Elements - Simple Basketball App";
document.getElementById("players").after(footer);

const addButton = document.createElement("button");
addButton.id = "btn-add";
addButton.classList.add("btn", "btn-primary");
addButton.textContent = "ADD";
addButton.addEventListener("click", () => {
    let itemInput = document.getElementById('text-add');
    if (!itemInput.value.trim()) return;

    let playersName = document.getElementById('players');

    let newItem = document.createElement('li');
    newItem.classList.add("player-item");
    newItem.textContent = itemInput.value;

    playersName.append(newItem);
    itemInput.value = '';
});

const itemInput = document.createElement("input");
itemInput.id = "text-add";
itemInput.classList.add("form-control");
itemInput.placeholder = "Enter player name";
playerControl.append(itemInput);
playerControl.append(addButton);














































// class Player {
//     constructor(name) {
//         this.name = name;
//         this.score = 0;
//     }
// }

// function calculateSuccessRate() {
//     return Math.random();
// }

// function shootBall(player, attempts) {
//     for (let i = 0; i < attempts; i++) {
//         if (calculateSuccessRate() > 0.5) {
//             player.score += 1;
//         }
//     }
// }

// function rankPlayers(players) {
//     return players.sort((a, b) => b.score - a.score);
// }

// function isTie(players) {
//     const topScore = players[0].score;
//     return players.filter(player => player.score === topScore).length > 1;
// }

// function getTiedPlayers(players) {
//     const topScore = players[0].score;
//     return players.filter(player => player.score === topScore);
// }

// function resetTiedPlayersScores(players) {
//     players.forEach(player => {
//         player.score = 0;
//     });
// }

// function tieBreakerRound(players, attempts, roundNumber) {
//     console.log("\n", String.fromCodePoint(0x1F525), `Tiebreaker Round needed between:`, players.map(p => p.name).join(", "));
//     console.log("\n", String.fromCodePoint(0x1F3C0), `Round ${roundNumber+1} Begins!`);
//     resetTiedPlayersScores(players);
//     players.forEach(player => {
//         shootBall(player, attempts);
//         console.log(`${player.name} scored ${player.score} successful shots.`);
//     });
// }

// function runGame() {
//     const players = [];

//     const attemptsPerRound = 5; 

//     players.forEach(player => shootBall(player, attemptsPerRound));

//     let rankedPlayers = rankPlayers(players);

//     console.log(String.fromCodePoint(0x1F3C6), " Rankings after this round:");
//     rankedPlayers.forEach((player, index) => {
//         console.log(`${index + 1}. ${player.name} - ${player.score} points`);
//     });

//     let tieBreakerCount = 1;
//     while (isTie(rankedPlayers)) {
//         let tiedPlayers = getTiedPlayers(rankedPlayers);
//         tieBreakerRound(tiedPlayers, attemptsPerRound, tieBreakerCount);
//         rankedPlayers = rankPlayers(tiedPlayers);
//         console.log(String.fromCodePoint(0x1F3C6), " Rankings after this round:");
//         rankedPlayers.forEach((player, index) => {
//             console.log(`${index + 1}. ${player.name} - ${player.score} points`);
//         });
//         tieBreakerCount++;
//     }

//     console.log(`\n${String.fromCodePoint(0x1F3C6)} The champion is ${rankedPlayers[0].name} with ${rankedPlayers[0].score} points!`);
// }

// runGame();