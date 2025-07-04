const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const playerSpan = document.getElementById('currentPlayer');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const renderSymbol = (cell, player) => {
  if (player === 'X') {
    cell.innerHTML = `
      <svg viewBox="0 0 100 100">
        <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" stroke-width="10"/>
        <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" stroke-width="10"/>
      </svg>
    `;
  } else {
    cell.innerHTML = `
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="10" fill="none"/>
      </svg>
    `;
  }
  cell.classList.add(player);
};

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const index = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  renderSymbol(clickedCell, currentPlayer);
  checkForWinner();
};

const checkForWinner = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      gameActive = false;
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      return;
    }
  }

  if (!gameState.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerSpan.textContent = currentPlayer;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
};

const resetGame = () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  playerSpan.textContent = currentPlayer;
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('X', 'O', 'win');
  });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
