const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setSquare = (index, symbol) => {
    if (index > board.length) return;
    board[index] = symbol;
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
      gameBoard.setSquare(index, playerX.getSymbol());
      console.log(gameBoard.board);
      render();
    });
  });

  return { render };
})();

const player = (symbol) => {
  this.symbol = symbol;

  const getSymbol = () => symbol;

  return { getSymbol };
};

// const gameController = (() => {
//   let playerX = player("X");
//   let playerO = player("O");
// })();

let playerX = player("X");
// displayController.render();
