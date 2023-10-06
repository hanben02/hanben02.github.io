class Controller{
    constructor(white){
        this.white = white;
    }
    get_material(){

    }
}

class Player extends Controller{
}

class Game{
    constructor(player1=undefined,player2=undefined,FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"){
        this.board = new Board()
        this.board.decode_fen(FEN)
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1.white ? player1 : player2;
    }
    move(){
        this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1
        console.log("change of turn to ", this.currentPlayer)
    }
    
}