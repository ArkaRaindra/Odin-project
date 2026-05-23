console.log("Hello, World!");

let humanScore = 0;
let computerScore = 0;

// revisiting (add UI)
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";

const container = document.querySelector(".container");

container.style.textAlign = "center";
container.style.padding = "30px";

const buttonsDiv = document.querySelector(".buttons");
buttonsDiv.style.margin = "20px";

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.style.padding = "15px"
    button.style.margin = "10px"
    button.style.fontSize = "18px"
    button.style.cursor = "pointer" 
});

//
const playerSelectionText =
document.querySelector("#playerChoice");

const ComputerChoiceText =
    document.querySelector("#computerChoice");

const resultText = 
document.querySelector("#resultText");

const humanScoreText =
document.querySelector("#humanScore");

const computerScoreText =
document.querySelector("#computerScore");

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random()*3)];
}

function playRound(playerSelection){

    const computerSelection =
    getComputerChoice();

    playerSelectionText.textContent =
    `Player: ${playerSelection}`;

    ComputerChoiceText.textContent =
    `Computer: ${computerSelection}`;

    if(playerSelection===computerSelection){
        resultText.textContent="Its a tie game!";

        // skor tetap ditampilkan
        humanScoreText.textContent = humanScore;
        computerScoreText.textContent = computerScore;

        return;
    }

    if(
        (playerSelection==="rock" &&
        computerSelection==="scissors") ||

        (playerSelection==="paper" &&
        computerSelection==="rock") ||

        (playerSelection==="scissors" &&
        computerSelection==="paper")
    ){
        humanScore++;
        resultText.textContent = "You Win!";
    }
    else{
        computerScore++;
        resultText.textContent = "You Lose!";
    }

    humanScoreText.textContent = humanScore;
    computerScoreText.textContent = computerScore;
}

document.querySelector("#rock")
.addEventListener("click",
    ()=>playRound("rock")
);

document.querySelector("#paper")
.addEventListener("click",
    ()=>playRound("paper")
);

document.querySelector("#scissors")
.addEventListener("click",
    ()=>playRound("scissors")
);