const gameBoard = (() => {
  const gameBoardArr = ["X", "X", "O", "O", "O", "X", "X", "X", "X"];

  const render = () => {
    const gameBoardSquares = document.querySelectorAll(".gameboard-square");
    const gameBoardSquaresArr = Array.from(gameBoardSquares);

    for (let i = 0; i < gameBoardArr.length; i++) {
      gameBoardSquaresArr[i].textContent = gameBoardArr[i];
    }
  };

  return { render };
})();

gameBoard.render();
