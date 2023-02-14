const choices = ["rock", "paper", "scissors"]
const winConditions = [
    { player: "rock", computer: "scissors", message: "You win! Rock beats scissors!" },
    { player: "paper", computer: "rock", message: "You win! Paper beats rock!" },
    { player: "scissors", computer: "paper", message: "You win! Scissors beats paper!" }
];

function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex]
}

function playRound(computerChoice, playerChoice) {
    let playerScore = 0;
    let computerScore = 0;
    let message = "";
    if (!choices.includes(playerChoice)) {
        message = "Wrong imput! Rock, paper, scissors!";
        return { playerScore, computerScore, message }
    }
    if (computerChoice === playerChoice) {
        message = "It's a draw!";
        return { playerScore, computerScore, message }
    }
    const winCondition = winConditions.find(c => c.player === playerChoice && c.computer === computerChoice);
    if (winCondition) {
        message = winCondition.message;
        playerScore++;
        return { message, playerScore, computerScore }
    }
    else {
        message = `Computer wins! ${computerChoice} beats ${playerChoice}!`;
        computerScore++;
        return { message, computerScore, playerScore }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.btn');
    let playerScore = 0;
    let computerScore = 0;
    let gameOver = false;
    btns.forEach(btn => {
        const message = document.querySelector('#message');
        const playerChoice = btn.getAttribute('data-btn');
        btn.addEventListener('click', () => {
            if (gameOver) return; // return if game over
            const computerChoice = getComputerChoice();
            let round = playRound(computerChoice, playerChoice);
            playerScore += round.playerScore;
            computerScore += round.computerScore;
            const playScore = document.querySelector('#playScore');
            playScore.innerHTML = playerScore;
            const compScore = document.querySelector('#compScore');
            compScore.innerHTML = computerScore;
            message.innerHTML = round.message;
            if (playerScore === 5 || computerScore === 5) {
                gameOver = true;
                if (playerScore > computerScore) {
                    message.innerHTML = "You win!";
                } else {
                    message.innerHTML = "Computer wins!";
                }
                // disable button event listeners
                btns.forEach(btn => {
                    btn.removeEventListener('click', () => {});
                    btn.style.transform = 'none';
                    btn.style.borderColor = 'black';
                    btn.style.boxShadow = 'none';
                });
            }
        });   
    });
});
