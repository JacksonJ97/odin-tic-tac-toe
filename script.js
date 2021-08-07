const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setSquare = (index, marker) => {
    if (index > board.length) return;
    board[index] = marker;
  };

  const getSquare = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { board, setSquare, getSquare, reset };
})();

const displayController = (() => {
  const gameBoardSquares = document.querySelectorAll(".gameboard-square");
  const gameBoardSquaresArr = Array.from(gameBoardSquares);

  const render = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      gameBoardSquaresArr[i].textContent = gameBoard.board[i];
    }
  };

  gameBoardSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");

      if (gameController.activePlayer === "playerX" && gameBoard.board[index] === "") {
        gameBoard.setSquare(index, gameController.playerX.getMarker());
        gameController.activePlayer = "playerO";
      } else if (gameController.activePlayer === "playerO" && gameBoard.board[index] === "") {
        gameBoard.setSquare(index, gameController.playerO.getMarker());
        gameController.activePlayer = "playerX";
      }

      if (gameController.checkXWinner()) {
        console.log("playerX wins");
        gameBoard.reset();
      } else if (gameController.checkOWinner()) {
        console.log("playerO wins");
        gameBoard.reset();
      }

      render();
    });
  });

  return { render, gameBoardSquaresArr };
})();

const player = (marker) => {
  this.marker = marker;

  const getMarker = () => marker;

  return { getMarker };
};

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

  const checkXWinner = () => {
    return winConditions.some((condition) => {
      // Will return true if one combination is satisfied
      return condition.every((index) => {
        return displayController.gameBoardSquaresArr[index].textContent === "X"; // Will return true if all indices in the combination array is equal to X
      });
    });
  };

  const checkOWinner = () => {
    return winConditions.some((condition) => {
      return condition.every((index) => {
        return displayController.gameBoardSquaresArr[index].textContent === "O";
      });
    });
  };

  return { checkXWinner, checkOWinner, activePlayer, playerX, playerO };
})();
