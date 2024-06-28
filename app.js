// SubTask1

const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
let current = players[0];

for(let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleCellClick);
}

function handleCellClick(event) {
  const cell = event.target;
  if (cell.innerText !== "") {
    return;
  }

  cell.innerText = current;

  if (checkWin(current)) {
    msg.innerText = `${current} wins!`;
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", handleCellClick);
    }
    return;
  }

  if (checkTie()) {
    msg.innerText = "It's a tie!";
    return;
  }

  // Switch the player
  current = current === players[0] ? players[1] : players[0];
  msg.innerText = `${current}'s turn!`;
}

// SubTask2

function checkWin(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winConditions.some(condition => 
    condition.every(index => cells[index].innerText === player)
  );
}

function checkTie() {
  return Array.from(cells).every(cell => cell.innerText !== "");
}

// SubTask3
function restart() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].addEventListener("click", handleCellClick); 
  }
  
  msg.innerText = `${players[0]}'s turn!`;
  
  current = players[0];
}

document.getElementById("restartButton").addEventListener("click", restart);
