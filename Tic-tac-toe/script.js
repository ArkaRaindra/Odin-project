const Player = (name, sign, avatar) => {
    let score = 0;

    const getName = () => name;
    const getSign = () => sign;
    const getAvatar = () => avatar;

    const addScore = () => {
        score++;
    };

    const getScore = () => score;

    return {
        getName,
        getSign,
        getAvatar,
        addScore,
        getScore,
    };
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const getField = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setField, getField, reset };
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("reset-btn");

    const scoreX = document.getElementById("score-x");
    const scoreO = document.getElementById("score-o");

    fieldElements.forEach((field) => {
        field.addEventListener("click", (e) => {
            if (gameController.getIsOver()) return;
            if (e.target.textContent !== "") return;

            gameController.playRound(
                parseInt(e.target.dataset.index)
            );

            updateGameboard();
        });
    });

    resetButton.addEventListener("click", () => {
        gameController.restartRound();
        gameBoard.reset();
        updateGameboard();
        removeGameOverScreen();
    });

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent =
                gameBoard.getField(i);
        }
    };

    const setMessage = (message) => {
        messageElement.textContent = message;
    };

    const updateScore = (playerX, playerO) => {
        scoreX.textContent = playerX.getScore();
        scoreO.textContent = playerO.getScore();
    };

    const showGameOver = (message) => {
        const overlay = document.createElement("div");
        overlay.classList.add("game-over");
        overlay.id = "game-over";

        overlay.innerHTML = `
            <div class="game-over-box">
                <h2>${message}</h2>
                <button id="restart-round-btn">
                    Restart
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        document
            .getElementById("restart-round-btn")
            .addEventListener("click", () => {
                gameController.restartRound();
                gameBoard.reset();
                updateGameboard();
                removeGameOverScreen();
            });
    };

    const removeGameOverScreen = () => {
        const overlay = document.getElementById("game-over");

        if (overlay) {
            overlay.remove();
        }
    };

    return {
        setMessage,
        updateGameboard,
        updateScore,
        showGameOver,
        removeGameOverScreen,
    };
})();

const gameController = (() => {
    let playerX;
    let playerO;

    let round = 1;
    let isOver = false;

    const startGame = () => {
        const player1Name =
            document.getElementById("player1-name").value || "Player 1";

        const player2Name =
            document.getElementById("player2-name").value || "Player 2";

        const player1Avatar =
            document.getElementById("player1-preview").src;

        const player2Avatar =
            document.getElementById("player2-preview").src;

        playerX = Player(player1Name, "X", player1Avatar);
        playerO = Player(player2Name, "O", player2Avatar);

        document.getElementById("player1-display").textContent =
            playerX.getName();

        document.getElementById("player2-display").textContent =
            playerO.getName();

        document.getElementById("player1-img").src =
            playerX.getAvatar();

        document.getElementById("player2-img").src =
            playerO.getAvatar();

        document
            .getElementById("setup-screen")
            .classList.add("hidden");

        document
            .getElementById("main-game")
            .classList.remove("hidden");

        displayController.setMessage(
            `${playerX.getName()}'s turn (X)`
        );
    };

    const playRound = (fieldIndex) => {
        const currentPlayer =
            round % 2 === 1 ? playerX : playerO;

        gameBoard.setField(
            fieldIndex,
            currentPlayer.getSign()
        );

        if (checkWinner(fieldIndex)) {
            currentPlayer.addScore();

            displayController.updateScore(
                playerX,
                playerO
            );

            displayController.setMessage(
                `${currentPlayer.getName()} wins!`
            );

            displayController.showGameOver(
                `${currentPlayer.getName()} wins!`
            );

            isOver = true;
            return;
        }

        if (round === 9) {
            displayController.setMessage("It's a draw!");

            displayController.showGameOver(
                "It's a draw!"
            );

            isOver = true;
            return;
        }

        round++;

        const nextPlayer =
            round % 2 === 1 ? playerX : playerO;

        displayController.setMessage(
            `${nextPlayer.getName()}'s turn (${nextPlayer.getSign()})`
        );
    };

    const checkWinner = (fieldIndex) => {
        const currentSign =
            round % 2 === 1
                ? playerX.getSign()
                : playerO.getSign();

        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        return winConditions
            .filter((combination) =>
                combination.includes(fieldIndex)
            )
            .some((combination) =>
                combination.every(
                    (index) =>
                        gameBoard.getField(index) === currentSign
                )
            );
    };

    const restartRound = () => {
        round = 1;
        isOver = false;

        displayController.setMessage(
            `${playerX.getName()}'s turn (X)`
        );
    };

    const getIsOver = () => {
        return isOver;
    };

    return {
        startGame,
        playRound,
        restartRound,
        getIsOver,
    };
})();

document
    .getElementById("start-btn")
    .addEventListener("click", () => {
        gameController.startGame();
    });

const setupAvatarPreview = (inputId, previewId) => {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (file) {
            preview.src = URL.createObjectURL(file);
        }
    });
};

setupAvatarPreview(
    "player1-avatar",
    "player1-preview"
);

setupAvatarPreview(
    "player2-avatar",
    "player2-preview"
);