console.log("Hello, World!");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return "It's a tie!";
    }

    if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        humanScore++;
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

function playGame() {
    let choice = prompt("Enter rock, paper, or scissors:");

    if (
        choice === null ||
        !["rock", "paper", "scissors"].includes(choice.toLowerCase())
    ) {
        console.log("Invalid choice!");
        return;
    }

    let computerChoice = getComputerChoice();

    console.log(`Player: ${choice}`);
    console.log(`Computer: ${computerChoice}`);

    let result = playRound(choice, computerChoice);
    console.log(result);

    console.log(
        `Your score: ${humanScore}, Computer score: ${computerScore}`
    );
    console.log("----------------");
}

for (let i = 0; i < 5; i++) {
    playGame();
}

console.log(`Final Score - You: ${humanScore}, Computer: ${computerScore}`);

if (humanScore > computerScore) {
    console.log("You win the game!");
} else if (humanScore < computerScore) {
    console.log("Computer wins the game!");
} else {
    console.log("It's a tie game!");
}