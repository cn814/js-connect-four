/* players 1 and 2 take turns placing pieces in a vertical column until players line up 4 adjacent (touching) pieces. If the board fills up and nobody has 4 adjacent pieces, the game ends as a tie */


 const WIDTH = 7;
 const HEIGHT = 6;

 /*active player is 1 or 2*/
 let currPlayer = 1; 
/*create empty array of rows, which is the game board*/
 let board = []; 
 
/* function to create gameboard */

 function makeBoard() {
   for (let y = 0; y < HEIGHT; y++) {
     board.push(Array.from({ length: WIDTH }));
   }
 }
 
/* display this board in HTML*/
 
 function makeHtmlBoard() {
   const board = document.getElementById('board');
 
/* create column headers for clickable area*/
const top = document.createElement('tr');
   top.setAttribute('id', 'column-top');
   top.addEventListener('click', handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement('td');
     headCell.setAttribute('id', x);
     top.append(headCell);
   }
 
   board.append(top);
 
/*create game board*/
for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement('tr');
 
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement('td');
       cell.setAttribute('id', `${y}-${x}`);
       row.append(cell);
     }
 
     board.append(row);
   }
 }
 
/* display available cell on top of column */
 
 function findSpotForCol(x) {
   for (let y = HEIGHT - 1; y >= 0; y--) {
     if (!board[y][x]) {
       return y;
     }
   }
   return null;
 }
 
/* put the piece in the board */
 
 function placeInTable(y, x) {
   const piece = document.createElement('div');
   piece.classList.add('piece');
   piece.classList.add(`p${currPlayer}`);
   piece.style.top = -50 * (y + 2);
 
   const spot = document.getElementById(`${y}-${x}`);
   spot.append(piece);
 }
 
/* end the game if winner found*/
 
 function endGame(msg) {
   alert(msg);
 }
 
/*handle the click*/
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
 
    //get next spot in the column, or ignore
    const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
    //place piece on game board
    board[y][x] = currPlayer;
   placeInTable(y, x);
   
    //check for winner
    if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
   
   // check for tie
   if (board.every(row => row.every(cell => cell))) {
     return endGame('Tie!');
   }
     
   // switch between clicks
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
/* check for Winner cell by cell*/
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
      
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       // find winner 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 