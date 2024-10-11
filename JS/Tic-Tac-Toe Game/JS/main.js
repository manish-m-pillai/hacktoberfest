import Game from "./Game.js"
import GameView from "./GameView.js"


let game = new Game();
let gameView = new GameView();

gameView.printScore();

document.querySelector(".restart")
.addEventListener("click", () => {
   onRestartClick();
})

document.querySelector(".reset")
.addEventListener("click", () => {
   onResetClick();
})

let tiles = document.querySelectorAll(".board-tile");
tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
       onTileClick(tile.dataset.index);
    })
})


function onTileClick(i){
    //do somthing
    game.makeMove(i); 
    gameView.updateBoard(game);
    gameView.printScore();
}

function onRestartClick() {
    game = new Game();
    gameView.updateBoard(game);
    gameView.finish = false;
    gameView.printScore();
}

function onResetClick() {
    game = new Game();
    gameView.updateBoard(game);
    gameView = new GameView();
    gameView.printScore();
}

gameView.updateBoard(game);