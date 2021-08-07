const gameBoard = {
  gameBoardArr: ["X", "O", "O", "O", "O", "X", "X", "X", "X"],
};

function renderGameBoard() {
  const gameBoardSquares = document.querySelectorAll(".gameboard-square");
  const gameBoardSquaresArr = Array.from(gameBoardSquares);

  for (let i = 0; i < gameBoard.gameBoardArr.length; i++) {
    gameBoardSquaresArr[i].textContent = gameBoard.gameBoardArr[i];
  }
}

renderGameBoard();
