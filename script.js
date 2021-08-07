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

    gameController.winnerDeclared = false;
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
    }

    if (!gameController.winnerDeclared) {
      resultMessageElement.textContent = "";
    }
  };

  gameBoardSquareElements.forEach((square) => {
    square.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      gameController.playRound(index);
      render();

      if (gameController.checkXWinner()) {
        gameController.winnerDeclared = true;
        setResultMessage();
        console.log("player X wins");
      } else if (gameController.checkOWinner()) {
        gameController.winnerDeclared = true;
        console.log("player O wins");
        setResultMessage();
      } else if (gameController.checkTie()) {
        console.log("It's a Tie!");
      } else {
        setResultMessage();
      }

      if (gameController.winnerDeclared) {
        gameBoard.reset();
      }
    });
  });

  return {};
})();

const gameController = (() => {
  const playerX = player("X");
  const playerO = player("O");
  let activePlayer = "playerX";
  let winnerDeclared = false;

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
    // Will return true if one combination is satisfied
    return winConditions.some((condition) => {
      // Will return true if all indices in the combination array is equal to X
      return condition.every((index) => {
        return gameBoard.board[index] === "X";
      });
    });
  };

  const checkOWinner = () => {
    // Will return true if one combination is satisfied
    return winConditions.some((condition) => {
      // Will return true if all indices in the combination array is equal to X
      return condition.every((index) => {
        return gameBoard.board[index] === "O";
      });
    });
  };

  const checkTie = () => {
    if (gameBoard.board.every((index) => index != "") && winnerDeclared === false) {
      return true;
    }
  };

  return { playRound, checkXWinner, checkOWinner, checkTie, winnerDeclared };
})();

// const tieBoard = ["X", "X", "O", "O", "X", "X", "X", "O", "X"];

// const checkTie = () => {
//   const result = tieBoard.every((index) => index != "");
//   return result;
// };

// console.log(checkTie());
