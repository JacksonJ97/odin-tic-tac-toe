const player = (marker) => {
  return { marker };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setSquare = (index, marker) => {
    board[index] = marker;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { board, setSquare, reset };
})();

const displayController = (() => {
  const gameBoardSquareElements = document.querySelectorAll(".gameboard-square");
  const gameBoardSquareElementsArr = Array.from(gameBoardSquareElements);

  const render = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      gameBoardSquareElementsArr[i].textContent = gameBoard.board[i];
    }
  };

  const setResultMessage = () => {
    const resultMessageElement = document.querySelector(".result-message");

    if (gameController.checkXWinner()) {
      resultMessageElement.textContent = "Player X Wins!";
    } else if (gameController.checkOWinner()) {
      resultMessageElement.textContent = "Player O Wins!";
    } else if (gameController.checkTie()) {
      resultMessageElement.textContent = "It's a Tie!";
    } else {
      resultMessageElement.textContent = "";
    }
  };

  const displayRestartBtn = () => {
    const restartBtn = document.querySelector(".restart-btn");
    restartBtn.style.display = "none";

    if (gameController.checkXWinner() || gameController.checkOWinner() || gameController.checkTie()) {
      restartBtn.style.display = "block";

      restartBtn.addEventListener("click", () => {
        gameBoard.reset();
        setResultMessage();
        render();
        restartBtn.style.display = "none";
      });
    }
  };

  gameBoardSquareElements.forEach((square) => {
    square.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      gameController.playRound(index);
      render();
      displayRestartBtn();
      setResultMessage();
      gameController.checkState();
    });
  });

  return {};
})();

const gameController = (() => {
  const playerX = player("X");
  const playerO = player("O");
  let activePlayer = "playerX";
  let gameOver = false;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playRound = (index) => {
    if (activePlayer === "playerX" && gameBoard.board[index] === "") {
      gameBoard.setSquare(index, playerX.marker);
      activePlayer = "playerO";
    } else if (activePlayer === "playerO" && gameBoard.board[index] === "") {
      gameBoard.setSquare(index, playerO.marker);
      activePlayer = "playerX";
    }
  };

  const checkXWinner = () => {
    return winConditions.some((condition) => {
      return condition.every((index) => {
        return gameBoard.board[index] === "X";
      });
    });
  };

  const checkOWinner = () => {
    return winConditions.some((condition) => {
      return condition.every((index) => {
        return gameBoard.board[index] === "O";
      });
    });
  };

  const checkTie = () => {
    if (gameBoard.board.every((index) => index != "") && gameOver === false) return true;
  };

  const checkState = () => {
    if (checkXWinner() || checkOWinner() || checkTie()) {
      gameOver = true;
    }

    if (gameOver) {
      gameBoard.reset();
      gameOver = false;
    }
  };

  return { playRound, checkXWinner, checkOWinner, checkTie, checkState };
})();
