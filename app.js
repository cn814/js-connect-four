/* players 1 and 2 take turns placing pieces in a vertical column until players line up 4 adjacent (touching) pieces. If the board fills up and nobody has 4 adjacent pieces, the game ends as a tie */

const width = 7;
const height = 6;

/*active player is 1 or 2*/
let currentPlayer=1;
/*create empty array of rows, which is the game board*/
let board = [];

/* function to create gameboard */
function makeBoard(){
    for (let h =0; h< height; h++){
        board.push(Array.from({length:width}));
    }
}

/* display this board in HTML*/
function makeHTMLboard(){
    const board = document.getElementById('board');
}

/* create column headers for clickable area*/
const header = document.createElement('tr');
header.setAttribute('id', 'header');
header.addEventListener('click', handleClick);

for (let w = 0; w < width; w++){
    const headCell = document.createElement('td');
    headCell.setAttribute('id',w);
    header.append(headCell);
}

board.push(header);

/*create game board*/
for (let h=0; h<height; h++){
    const row = document.createElement('tr');

    for(let w=0; w<width; w++){
        const cell = document.createElement('td');
        cell.setAttribute('id', `${h}-${w}`);
        row.append(cell);
    }
    board.push(row);
}

/* display available cell on top of column */
function topSpotInColumn(x){
    for (let h= height -1; h>= 0; h--){
        if (!board[h][w]){
            return h;
        }
    }
    return null;
}

/* put the piece in the board */
function placeOnBoard(h,w){
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currentPlayer}`);
    piece.style.top = -50* (h + 2);

    const spot = document.getElementById(`${h}-${w}`);
    spot.append(piece);
}

/* end the game if winner found*/
function endGame(msg){
    alert(msg);
}

/*handle the click*/
function handleClick(evt){
    /*get w from id of the clicked cell*/
    const w = +evt.target.width;
    //get next spot in the column, or ignore
    const h= topSpotInColumn(x);
    if (y === null){
        return;
    }
    //place piece on game board
    board[h][w]=currentPlayer;
    placeOnBoard(h,w);

    //check for winner
    if (checkForWinner()){
        return endGame(`Player ${currentPlayer} has won the game!`);
    }

    //check for tie
    if (board.every(row=>row.every(cell=>cell))){
        return endGame("It's a tie!");
    }

    //switch between clicks
    currentPlayer= currentPlayer === 1 ? 2: 1;
}

/* check for Winner cell by cell*/
function checkForWinner(){
    function _win(cells){
        //check to see if four cells are the same color
        //-cells: list of for (h,w) cells
        //-returns true if all are same player

        return cells.every(
           ([h,w])=>
            h >= 0 &&
            h<height &&
            w >= 0 &&
            w < width &&
            board[h][w]=== currentPlayer 
        )
    }
    for (let h=0; h<height; h++){
        for (let w=0; w<width; w++){
            const horizontal= [[h,w],[h,w+1],[h,w+2], [h,w+3]];
            const vertical= [[h,w],[h+1,w],[h+2,w],[h+3,w]];
            const diagonalright= [[h,w],[h+1,w+1],[h+2,w+2],[h+3,w+3]];
            const diagonalleft= [[h,w],[h+1,w-1],[h+2,w-2],[h+3,w-3]];

            //find winner
            if (_win(horizontal) || _win(vertical) || _win(diagonalleft) || _win(diagonalright)){
                return true;
            }
        }
    }
}
makeBoard();
makeHTMLboard();