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

const gameControls = document.createElement("div");
gameControls.classList.add("game-controls", "mb-3");
document.getElementById("players").after(gameControls);

const footer = document.createElement("p");
footer.textContent = "2025 Marc Anthony Zapata. All rights reserved.";
gameControls.after(footer);

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

const playButton = document.createElement("button");
playButton.id = "btn-play";
playButton.classList.add("btn", "btn-success");
playButton.textContent = "PLAY";
playButton.addEventListener("click", runGame);
gameControls.append(playButton);

const resultsDiv = document.createElement("div");
resultsDiv.id = "game-results";
resultsDiv.classList.add("results-container");
gameControls.after(resultsDiv);

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

function calculateSuccessRate() {
    return Math.random();
}

function shootBall(player, attempts) {
    for (let i = 0; i < attempts; i++) {
        if (calculateSuccessRate() > 0.5) {
            player.score += 1;
        }
    }
}

function rankPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

function isTie(players) {
    if (players.length < 2) return false;
    const topScore = players[0].score;
    return players.filter(player => player.score === topScore).length > 1;
}

function getTiedPlayers(players) {
    const topScore = players[0].score;
    return players.filter(player => player.score === topScore);
}

function resetTiedPlayersScores(players) {
    players.forEach(player => {
        player.score = 0;
    });
}

function displayRoundResults(players, roundNumber, isTieBreaker = false) {
    const resultsDiv = document.getElementById('game-results');
    const roundTitle = document.createElement('h3');
    roundTitle.textContent = isTieBreaker ? 
        `🏀 Round ${roundNumber + 1}  Results:` : 
        `🏀 Round ${roundNumber} Results:`;
    resultsDiv.append(roundTitle);
    
    const resultsList = document.createElement('ul');
    resultsList.classList.add('results-list');
    
    players.forEach((player, index) => {
        const resultItem = document.createElement('li');
        resultItem.innerHTML = `${index + 1}. ${player.name} - <strong>${player.score}</strong> points`;
        resultsList.append(resultItem);
    });
    
    resultsDiv.append(resultsList);
}

function tieBreakerRound(players, attempts, roundNumber) {
    resetTiedPlayersScores(players);
    players.forEach(player => {
        shootBall(player, attempts);
    });
    displayRoundResults(players, roundNumber, true);
}

function runGame() {
    const playerItems = document.querySelectorAll('#players li');
    if (playerItems.length <= 1) {
        alert("Please add at least TWO player first!");
        return;
    }

    const resultsDiv = document.getElementById('game-results');
    resultsDiv.innerHTML = '<h2>🏆 Game Results</h2>';
    
    const players = Array.from(playerItems).map(item => new Player(item.textContent));
    const attemptsPerRound = 10;

    players.forEach(player => shootBall(player, attemptsPerRound));
    let rankedPlayers = rankPlayers([...players]);
    displayRoundResults(rankedPlayers, 1);

    let tieBreakerCount = 1;
    while (isTie(rankedPlayers)) {
        let tiedPlayers = getTiedPlayers(rankedPlayers);
        tieBreakerRound(tiedPlayers, attemptsPerRound, tieBreakerCount);
        rankedPlayers = rankPlayers([...tiedPlayers]);
        tieBreakerCount++;
    }

    const championDiv = document.createElement('div');
    championDiv.classList.add('champion');
    championDiv.innerHTML = `
        <h3>🎉 Champion</h3>
        <p>${rankedPlayers[0].name} wins with ${rankedPlayers[0].score} points!</p>
    `;
    resultsDiv.append(championDiv);
}