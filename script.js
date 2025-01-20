let currentGameMode = null;
let player1Name = 'Home';
let player2Name = 'Guest';
let player1Score = 0;
let player2Score = 0;
const matchHistory = [];

function selectGameMode(mode) {
    currentGameMode = mode;
    const gameSelection = document.getElementById('game-selection');
    const scoreboard = document.getElementById('scoreboard');
    const gameScreen = document.getElementById('game-screen');
    const playerInput = document.getElementById('player-input');
    const gameSettings141 = document.getElementById('game-settings-14-1');
    const standardScoreboard = document.getElementById('standard-scoreboard');

    if (gameSelection) gameSelection.style.display = 'flex';
    if (scoreboard) scoreboard.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'none';
    if (playerInput) playerInput.style.display = 'none';
    if (gameSettings141) gameSettings141.style.display = 'none';

    if (mode) {
        if (mode === '8-ball' || mode === '9-ball' || mode === '10-ball') {
            // Display logic for standard game modes
            if (gameSelection) gameSelection.style.display = 'none';
            if (scoreboard) scoreboard.style.display = 'block';
            if (standardScoreboard) standardScoreboard.style.display = 'flex';
            startGame();
        } else if (mode === '14.1 Continuous' || mode === '14.1 Continuous Trainer') {
            // Display logic for 14.1 Continuous modes
            if (gameSelection) gameSelection.style.display = 'none';
            if (playerInput) playerInput.style.display = 'block';
            if (gameSettings141) gameSettings141.style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    selectGameMode(null);
    loadGameHistory();
    initializeGame();
});

function startGame() {
    let maxInnings = 10;
    let maxBalls = 100;

    if (currentGameMode === '14.1 Continuous' || currentGameMode === '14.1 Continuous Trainer') {
         maxInnings = parseInt(document.getElementById('max-innings').value);
        maxBalls = parseInt(document.getElementById('max-balls').value);

        if (isNaN(maxInnings) || maxInnings < 1) {
            alert("Please enter a valid number for Max Innings (minimum 1).");
            return;
        }
        if (isNaN(maxBalls) || maxBalls < 1) {
            alert("Please enter a valid number for Max Balls (minimum 1).");
            return;
        }

        // Store these settings in the gameState object or similar
        gameState.maxInnings = maxInnings;
        gameState.maxBalls = maxBalls;

        gameState.player1Name = document.getElementById('player1-name-continuous').value;
        gameState.player2Name = document.getElementById('player2-name-continuous').value;


         showGameScreen(currentGameMode);
       return;
    }
    
        player1Name = document.getElementById('player1-name-continuous').value;
        player2Name = document.getElementById('player2-name-continuous').value;
        
        if (!player1Name || !player2Name) {
            alert('Please enter names for both players.');
            return;
        }

        player1Score = 0;
        player2Score = 0;
        updateStandardScoreboard();
        document.getElementById('game-selection').style.display = 'none';
        document.getElementById('player-input').style.display = 'none';
        document.getElementById('scoreboard').style.display = 'block';
        document.getElementById('standard-scoreboard').style.display = 'flex';
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('game-title').textContent = currentGameMode;
        document.getElementById('player1-name').textContent = player1Name;
        document.getElementById('player2-name').textContent = player2Name;
    }


function incrementScore(player) {
    if (player === 1) {
        player1Score++;
    } else {
        player2Score++;
    }
    updateStandardScoreboard();
}

function decrementScore(player) {
    if (player === 1) {
        player1Score = Math.max(0, player1Score - 1);
    } else {
        player2Score = Math.max(0, player2Score - 1);
    }
    updateStandardScoreboard();
}

function updateStandardScoreboard() {
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
}

function endGame() {
    const endedGameMode = currentGameMode;

    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('standard-scoreboard').style.display = 'none';
    selectGameMode(null);

    saveGameToHistory(endedGameMode);
    resetGameState();

    loadGameHistory();
    currentGameMode = null;
}

const playerNameInputP1 = document.getElementById('player1-name-continuous');
const playerNameInputP2 = document.getElementById('player2-name-continuous');
const currentScoreDisplayP1 = document.getElementById('current-score-p1');
const highRunDisplayP1 = document.getElementById('high-run-p1');
const inningsDisplayP1 = document.getElementById('innings-p1');
const currentScoreDisplayP2 = document.getElementById('current-score-p2');
const highRunDisplayP2 = document.getElementById('high-run-p2');
const inningsDisplayP2 = document.getElementById('innings-p2');
const ballsOnTableDisplay = document.getElementById('balls-on-table');
const newRackBtn = document.getElementById('new-rack');
const inningDetailsTable = document.getElementById('inning-details');
const foulBtn = document.getElementById('foul');
const safetyBtn = document.getElementById('safety');
const undoBtn = document.getElementById('undo');
const resetBtn = document.getElementById('reset');
const ballButtonsContainer = document.querySelector('.ball-buttons');
const currentPlayerDisplay = document.getElementById('current-player');
const currentPlayerDisplayParent = document.getElementById('current-player-display');
const inningTableContainer = document.querySelector('.inning-table-container');

const modalOverlay = document.getElementById('modal-overlay');
const modalMessage = document.getElementById('modal-message');
const modalConfirmBtn = document.getElementById('modal-confirm');
const modalCancelBtn = document.getElementById('modal-cancel');

const fullscreenModal = document.getElementById('fullscreen-modal');
const fullscreenConfirmBtn = document.getElementById('fullscreen-confirm');
const fullscreenCancelBtn = document.getElementById('fullscreen-cancel');

let gameState = {
    currentScoreP1: 0,
    highRunP1: 0,
    inningsP1: 0,
    currentScoreP2: 0,
    highRunP2: 0,
    inningsP2: 0,
    ballsRemaining: 15,
    currentInningBallsPotted: 0,
    history: [],
    rackHistory: [],
    inningHistory: [],
    currentPlayer: 1,
    gameMode: 1,
    maxInnings: 10,
    maxBalls: 100
};

const initializeGame = () => {
    createRemainingBallsButtons();
};

const showGameScreen = (mode) => {
    document.getElementById('game-selection').style.display = 'none';
    document.getElementById('player-input').style.display = 'none';
    document.getElementById('standard-scoreboard').style.display = 'none';
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('game-title').textContent = mode;

    gameState.gameMode = (mode === '14.1 Continuous') ? 2 : 1;

    document.getElementById('player1-name-continuous-display').textContent = gameState.player1Name;
    document.getElementById('player2-name-continuous-display').textContent = gameState.player2Name;

    if (mode === '14.1 Continuous Trainer') {
        playerNameInputP2.parentElement.style.display = 'none';
        currentScoreDisplayP2.parentElement.style.display = 'none';
        highRunDisplayP2.parentElement.style.display = 'none';
        inningsDisplayP2.parentElement.style.display = 'none';
        currentPlayerDisplayParent.style.display = 'none';
        document.getElementById('player2-name-continuous-display').parentElement.style.display = 'none';

    } else {
        playerNameInputP2.parentElement.style.display = 'block';
        currentScoreDisplayP2.parentElement.style.display = 'block';
        highRunDisplayP2.parentElement.style.display = 'block';
        inningsDisplayP2.parentElement.style.display = 'block';
        currentPlayerDisplayParent.style.display = 'block';
        document.getElementById('player2-name-continuous-display').parentElement.style.display = 'block';
    }
    resetGame(false);
    createRemainingBallsButtons();
};

const loadGameHistory = () => {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (history.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No games played yet.';
        historyList.appendChild(listItem);
    } else {
        history.slice().reverse().forEach((game, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = '';
            let text = "";
            if (game.mode === '14.1 Continuous') {
                text = `<strong>${game.mode}:</strong> ${game.date} - <strong>Player 1:</strong> ${game.player1} (Innings: ${game.inningsP1}, Balls Potted: ${game.ballsPottedP1}); <strong>Player 2:</strong> ${game.player2} (Innings: ${game.inningsP2}, Balls Potted: ${game.ballsPottedP2})`;
            } else if (game.mode === '14.1 Continuous Trainer') {
                text = `<strong>${game.mode}:</strong> ${game.date} - Player: ${game.player1} (Innings: ${game.inningsP1}, Balls Potted: ${game.ballsPottedP1})`;
            }
            else {
                text = `<strong>${game.mode}:</strong> ${game.player1} ${game.score1} - ${game.score2} ${game.player2}`;
            }
            listItem.innerHTML = text;
            historyList.appendChild(listItem);
        });
    }
};

const saveGameToHistory = (endedGameMode) => {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const today = new Date();
    const dateString = today.toLocaleDateString();
    const timeString = today.toLocaleTimeString();
    let gameData = {};
    if (endedGameMode === '14.1 Continuous') {
        gameData = {
            date: `${dateString} ${timeString}`,
            mode: endedGameMode,
            player1: playerNameInputP1.value,
            player2: playerNameInputP2.value,
            inningsP1: gameState.inningsP1 - 1,
            ballsPottedP1: gameState.currentScoreP1,
            inningsP2: gameState.inningsP2 - 1,
            ballsPottedP2: gameState.currentScoreP2
        };
    } else if (endedGameMode === '14.1 Continuous Trainer') {
        gameData = {
            date: `${dateString} ${timeString}`,
            mode: endedGameMode,
            player1: playerNameInputP1.value,
            player2: null,
            inningsP1: gameState.inningsP1 - 1,
            ballsPottedP1: gameState.currentScoreP1,
            inningsP2: null,
            ballsPottedP2: null
        };
    } else {
        gameData = {
            mode: endedGameMode,
            player1: player1Name,
            player2: player2Name,
            score1: player1Score,
            score2: player2Score
        }
    }
    console.log("Saving game data:", gameData);

    history.push(gameData);
    localStorage.setItem('gameHistory', JSON.stringify(history));
};

const clearGameHistory = () => {
    localStorage.removeItem('gameHistory');
    loadGameHistory();
};

const exportGameHistory = () => {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const historyString = JSON.stringify(history);
    const blob = new Blob([historyString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'game_history.json';
    link.href = url;
    link.click();
}

const importGameHistory = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedHistory = JSON.parse(e.target.result);
                localStorage.setItem('gameHistory', JSON.stringify(importedHistory));
                loadGameHistory();
            } catch (error) {
                console.error("Error importing history", error);
                alert("Invalid file format. Please select a valid JSON file.");
            }
        };
        reader.readAsText(file);
    }
}

const createRemainingBallsButtons = () => {
    ballButtonsContainer.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => setRemainingBalls(i));
        ballButtonsContainer.appendChild(button);
    }
};

const setRemainingBalls = (balls) => {
    if (balls > gameState.ballsRemaining) {
        alert('Invalid number of balls remaining. It cannot be greater than the current number of balls on the table.');
        return;
    }

    updateInning(balls);
};

const updateInning = (ballsRemaining) => {
    const ballsPotted = gameState.ballsRemaining - ballsRemaining;
    gameState.currentInningBallsPotted = ballsPotted;

    if (gameState.gameMode === 1 || gameState.currentPlayer === 1) {
        gameState.currentScoreP1 += ballsPotted;
        gameState.highRunP1 = Math.max(gameState.highRunP1, ballsPotted);
    } else {
        gameState.currentScoreP2 += ballsPotted;
        gameState.highRunP2 = Math.max(gameState.highRunP2, ballsPotted);
    }
    gameState.ballsRemaining = ballsRemaining;

    updateInningTable(ballsPotted);
    updateDisplay();
    addToHistory({ type: 'inning', player: gameState.currentPlayer, ballsPotted, score: (gameState.gameMode === 1 || gameState.currentPlayer === 1) ? gameState.currentScoreP1 : gameState.currentScoreP2, remaining: gameState.ballsRemaining });
    updateInnings(gameState.currentPlayer);
    switchPlayer();
    checkGameEnd();
};

const handleNewRack = () => {
    gameState.rackHistory.push({ index: gameState.history.length, player: gameState.currentPlayer });
    gameState.ballsRemaining += 14;
    updateInningTable(14);
    updateDisplay();
    addToHistory({ type: 'rack', player: gameState.currentPlayer, ballsPotted: 14, remaining: gameState.ballsRemaining });
};

const handleFoul = () => {
    if (gameState.gameMode === 1 || gameState.currentPlayer === 1) {
        gameState.currentScoreP1 = Math.max(0, gameState.currentScoreP1 - 1);
    } else {
        gameState.currentScoreP2 = Math.max(0, gameState.currentScoreP2 - 1);
    }
    updateInnings(gameState.currentPlayer);
    updateInningTable('Foul');
    updateDisplay();
    addToHistory({ type: 'foul', player: gameState.currentPlayer, score: (gameState.gameMode === 1 || gameState.currentPlayer === 1) ? gameState.currentScoreP1 : gameState.currentScoreP2 });
    switchPlayer();
    checkGameEnd();
};

const handleSafety = () => {
    updateInnings(gameState.currentPlayer);
    updateInningTable('Safety');
    updateDisplay();
    addToHistory({ type: 'safety', player: gameState.currentPlayer });
    switchPlayer();
    checkGameEnd();
};

const undoLastAction = () => {
    if (gameState.history.length === 0) return;

    const lastAction = gameState.history.pop();

    if (lastAction.type === 'inning') {
        if (gameState.gameMode === 1) {
            gameState.currentScoreP1 -= lastAction.ballsPotted;
            if (gameState.inningsP1 > 1) {
                gameState.inningsP1--;
            }
            gameState.highRunP1 = calculateHighRun(gameState.history.filter(a => a.type === 'inning' && a.player === 1));
        } else {
            if (lastAction.player === 1) {
                gameState.currentScoreP1 -= lastAction.ballsPotted;
                if (gameState.inningsP1 > 1) {
                    gameState.inningsP1--;
                }
                gameState.highRunP1 = calculateHighRun(gameState.history.filter(a => a.type === 'inning' && a.player === 1));
            } else {
                gameState.currentScoreP2 -= lastAction.ballsPotted;
                if (gameState.inningsP2 > 1) {
                    gameState.inningsP2--;
                }
                gameState.highRunP2 = calculateHighRun(gameState.history.filter(a => a.type === 'inning' && a.player === 2));
            }
        }
        gameState.ballsRemaining = lastAction.remaining;
        gameState.inningHistory.pop();
    } else if (lastAction.type === 'rack') {
        gameState.ballsRemaining -= 14;
        for (let i = gameState.rackHistory.length - 1; i >= 0; i--) {
            if (gameState.rackHistory[i].index === (gameState.history.length + 1)) {
                gameState.rackHistory.splice(i, 1);
                break;
            }
        }
        gameState.inningHistory.pop();
    } else if (lastAction.type === 'foul') {
        if (gameState.gameMode === 1) {
            gameState.currentScoreP1 = lastAction.score + 1;
            if (gameState.inningsP1 > 1) {
                gameState.inningsP1--;
            }
        } else {
            if (lastAction.player === 1) {
                gameState.currentScoreP1 = lastAction.score + 1;
                if (gameState.inningsP1 > 1) {
                    gameState.inningsP1--;
                }
            } else {
                gameState.currentScoreP2 = lastAction.score + 1;
                if (gameState.inningsP2 > 1) {
                    gameState.inningsP2--;
                }
            }
        }
        gameState.inningHistory.pop();
    } else if (lastAction.type === 'safety') {
        if (gameState.gameMode === 1) {
            if (gameState.inningsP1 > 1) {
                gameState.inningsP1--;
            }
        } else {
            if (lastAction.player === 1) {
                if (gameState.inningsP1 > 1) {
                    gameState.inningsP1--;
                }
            } else {
                if (gameState.inningsP2 > 1) {
                    gameState.inningsP2--;
                }
            }
        }
        gameState.inningHistory.pop();
    }

    if (gameState.gameMode === 2 && gameState.currentPlayer !== lastAction.player) {
        switchPlayer();
    }

    updateDisplay();
    updateInningTable();
};

const endGameContinuous = () => {
    modalMessage.textContent = 'Are you sure you want to end the current game?';
    modalOverlay.style.display = 'flex';

    modalConfirmBtn.onclick = () => {
        modalOverlay.style.display = 'none';
        saveGameToHistory(currentGameMode);
        resetGameState();
        selectGameMode(null);
        loadGameHistory();
    };

    modalCancelBtn.onclick = () => {
        modalOverlay.style.display = 'none';
    };
};

const resetGame = (saveToHistory = true) => {
    if (saveToHistory) {
        saveGameToHistory(currentGameMode);
    }
    gameState.currentScoreP1 = 0;
    gameState.highRunP1 = 0;
    gameState.inningsP1 = 1;
    gameState.currentScoreP2 = 0;
    gameState.highRunP2 = 0;
    gameState.inningsP2 = 1;
    gameState.ballsRemaining = 15;
    gameState.currentInningBallsPotted = 0;
    gameState.history = [];
    gameState.rackHistory = [];
    gameState.inningHistory = [];
    gameState.currentPlayer = 1;
    updateDisplay();
    clearInningTable();
    updateInningTable();
    saveGameState();
};

const resetGameState = () => {
    player1Score = 0;
    player2Score = 0;
    updateStandardScoreboard();

    gameState.currentScoreP1 = 0;
    gameState.highRunP1 = 0;
    gameState.inningsP1 = 1;
    gameState.currentScoreP2 = 0;
    gameState.highRunP2 = 0;
    gameState.inningsP2 = 1;
    gameState.ballsRemaining = 15;
    gameState.currentInningBallsPotted = 0;
    gameState.history = [];
    gameState.rackHistory = [];
    gameState.inningHistory = [];
    gameState.currentPlayer = 1;
    gameState.gameMode = null;
    gameState.maxInnings = 10;
    gameState.maxBalls = 100;
};

const updateDisplay = () => {
    currentScoreDisplayP1.textContent = gameState.currentScoreP1;
    highRunDisplayP1.textContent = gameState.highRunP1;
    inningsDisplayP1.textContent = gameState.inningsP1;
    currentScoreDisplayP2.textContent = gameState.currentScoreP2;
    highRunDisplayP2.textContent = gameState.highRunP2;
    inningsDisplayP2.textContent = gameState.inningsP2;
    ballsOnTableDisplay.textContent = gameState.ballsRemaining;
    newRackBtn.disabled = false;
    currentPlayerDisplay.textContent = gameState.currentPlayer;
    saveGameState();
};
const clearInningTable = () => {
    while (inningDetailsTable.rows.length > 0) {
        inningDetailsTable.deleteRow(0);
    }
};

const updateInningTable = (ballsPotted) => {
    let currentInning = 0;
    clearInningTable();
    if (typeof ballsPotted !== 'undefined') {

        if (gameState.gameMode === 1) {
            currentInning = gameState.inningsP1;
        } else {
            currentInning = (gameState.currentPlayer === 1) ? gameState.inningsP1 : gameState.inningsP2;
        }

        gameState.inningHistory.push({
            inning: currentInning,
            player: gameState.gameMode === 1 ? 1 : gameState.currentPlayer,
            ballsPotted: ballsPotted,
            score: (gameState.gameMode === 1 || gameState.currentPlayer === 1) ? gameState.currentScoreP1 : gameState.currentScoreP2
        });
    }

    gameState.inningHistory.forEach(inning => {
        const row = inningDetailsTable.insertRow();
        const inningCell = row.insertCell();
        const playerCell = row.insertCell();
        const ballsPottedCell = row.insertCell();
        const scoreCell = row.insertCell();

        inningCell.textContent = inning.inning;
        playerCell.textContent = inning.player;
        ballsPottedCell.textContent = inning.ballsPotted;
        scoreCell.textContent = inning.score;
    });
    inningTableContainer.scrollTop = inningTableContainer.scrollHeight;
};
const addToHistory = (action) => {
    gameState.history.push(action);
};

const calculateHighRun = (history) => {
    let highRun = 0;
    let currentRun = 0;
    for (let action of history) {
        if (action.type === 'inning') {
            currentRun += action.ballsPotted;
        } else {
            highRun = Math.max(highRun, currentRun);
            currentRun = 0;
        }
    }
    return Math.max(highRun, currentRun);
};

const saveGameState = () => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
};

const loadGameState = () => {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (savedState) {
        gameState = savedState;
        updateInningTable();
    }
};

const switchPlayer = () => {
    if (gameState.gameMode === 2) {
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.textContent = gameState.currentPlayer;
    }
};

const updateInnings = (player) => {
    if (gameState.gameMode === 1) {
        gameState.inningsP1++;
    } else if (player === 1) {
        gameState.inningsP1++;
    } else if (player === 2) {
        gameState.inningsP2++;
    }
};

const checkGameEnd = () => {
    if (currentGameMode === '14.1 Continuous') {
        if (gameState.inningsP1 > gameState.maxInnings || gameState.inningsP2 > gameState.maxInnings) {
            endGameContinuous();
            alert(`Game Over! Maximum innings reached (${gameState.maxInnings}).`);
            return;
        }
        if (gameState.currentScoreP1 >= gameState.maxBalls || gameState.currentScoreP2 >= gameState.maxBalls) {
            endGameContinuous();
            alert(`Game Over! A player reached the target score of ${gameState.maxBalls}.`);
            return;
        }
    } else if (currentGameMode === '14.1 Continuous Trainer') {
        if (gameState.inningsP1 > gameState.maxInnings) {
            endGameContinuous();
            alert(`Game Over! Maximum innings reached (${gameState.maxInnings}).`);
            return;
        }
        if (gameState.currentScoreP1 >= gameState.maxBalls) {
            endGameContinuous();
            alert(`Game Over! You reached the target score of ${gameState.maxBalls}.`);
            return;
        }
    }
};

document.getElementById('clear-history').addEventListener('click', clearGameHistory);
document.getElementById('export-history').addEventListener('click', exportGameHistory);
document.getElementById('import-history-button').addEventListener('click', () => document.getElementById('import-history').click());
document.getElementById('import-history').addEventListener('change', importGameHistory);

newRackBtn.addEventListener('click', handleNewRack);
foulBtn.addEventListener('click', handleFoul);
safetyBtn.addEventListener('click', handleSafety);
undoBtn.addEventListener('click', undoLastAction);
resetBtn.addEventListener('click', resetGame);
document.getElementById('end-game').addEventListener('click', endGameContinuous);

initializeGame();