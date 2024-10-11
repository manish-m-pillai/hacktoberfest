export default class GameView {

    constructor(){
    this.x_score = 0;
    this.o_score = 0;
    this.draw = 0;
    this.finish = false;
    this.text = null;
    }

    updateBoard(game){
        this.updateTurn(game);
        const winningCombination = game.findWinningCombinations();
        let null_count = 9;
        for(let i = 0; i < game.board.length; i++) {
            const tile = document.querySelector(`.board-tile[data-index='${i}']`);
           
            tile.classList.remove("tile-winner");

            let tileType = game.board[i] == 'X' ? "tile-x" : "tile-o";

            tile.innerHTML = `<span class="${tileType}">${game.board[i] ? game.board[i] : ""}</span>`

            if(winningCombination && winningCombination.includes(i)){
                tile.classList.add("tile-winner");
                let playerX = document.querySelector(".player-X")        
                let playerO = document.querySelector(".player-O");   
                playerX.classList.remove("active");     
                playerO.classList.remove("active");
                this.finish = true;
                this.text = game.board[i];
            }

            if(game.board[i]!=null){
                null_count--;
            }
        }
        if(null_count==0){
            this.finish = false;
            this.post_match("draw");
        }

    }

    updateTurn(game) {
        let playerX = document.querySelector(".player-X")        
        let playerO = document.querySelector(".player-O");   
        playerX.classList.remove("active");     
        playerO.classList.remove("active");     

        if (game.turn == 'X') {
            playerX.classList.add('active');
        } else {
            playerO.classList.add('active');
        }
    }

    
    post_match(){
        if(this.finish){
            this.scoreUpdate(this.text);
        }
        else{
            this.scoreUpdate("draw");
        }
    }

    scoreUpdate(ch){
        if(ch == "X"){
            this.x_score++;
        }
        else if(ch == "O"){
            this.o_score++;
        }
        else{
            this.draw++;
        }
    }
    printScore(){
        let scores = document.querySelectorAll(".scores p");
        scores[0].textContent = `Player-X : ${this.x_score}`;
        scores[1].textContent = `Player-O : ${this.o_score}`; 
        scores[2].textContent = `Draw : ${this.draw}`;
    }

    get_x_score(){
        return this.x_score;
    }

    get_o_score(){
        return this.o_score;
    }

    get_draw(){
        return this.draw;
    }
}