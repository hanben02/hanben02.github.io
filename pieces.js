class Piece {
    constructor(isWhite){
        this.white = isWhite;
        this.path = "./imgs/";
    }
    get_white(){
        return this.white;
    }
    kill(){
        //kill
    }
    move(start,end){
        start.remove_piece(undefined);
        end.set_piece(this);
    }
    canMove(start,end){
        if(end?.get_piece()?.white == this.white){
            return false;
        }
        return true;
    }
}
class Queen extends Piece {

    static whitePath = "white_queen.png";
    static blackPath = "black_queen.png";
    constructor(isWhite){
        super(isWhite);
        this.path += this.white ? Queen.whitePath : Queen.blackPath;
    }
    canMove(start,end){
        if(!super.canMove(start,end)){
            return false;
        }
        const y_move = start.row - end.row;
        const x_move = start.column - end.column;
        if(Math.abs(y_move) > 0 && Math.abs(x_move) > 0 && Math.abs(x_move) != Math.abs(y_move)) {
            return false;
        }
        if(!start.board.getPart(start.column,start.row,x_move,y_move)){
            return false;
        }
        return true;
    }
}
class Rook extends Piece {

    static whitePath = "white_rook.png";
    static blackPath = "black_rook.png";
    constructor(isWhite){
        super(isWhite);
        this.path += this.white ? Rook.whitePath : Rook.blackPath;
    }
    canMove(start,end){
        if(!super.canMove(start,end)){
            return false;
        }
        const y_move = start.row - end.row;
        const x_move = start.column - end.column;
        if(Math.abs(y_move) > 0 && Math.abs(x_move) > 0) {
            return false;
        }
        if(!start.board.getPart(start.column,start.row,x_move,y_move)){
            return false;
        }
        
        return true;
    }
}
class King extends Piece {

    static whitePath = "white_king.png";
    static blackPath = "black_king.png";
    constructor(isWhite){
        super(isWhite);
        this.path += this.white ? King.whitePath : King.blackPath;
    }
    canMove(start,end){
        super.canMove();
        const y_move = start.row - end.row;
        const x_move = start.column - end.column
        if(Math.abs(y_move) > 1 || Math.abs(x_move) > 1) {
            return false;
        }
        return true;
    }
}
class Pawn extends Piece {

    static whitePath = "white_pawn.png";
    static blackPath = "black_pawn.png";
    constructor(isWhite){
        super(isWhite);
        this.hasMoved = false;
        this.path += this.white ? Pawn.whitePath : Pawn.blackPath;
    }
    canMove(start,end){
        if(!super.canMove(start,end)){
            return false;
        }
        const xMove = start.column - end.column;
        const yMove = this.white ? (start.row - end.row) : (end.row-start.row);
        if(yMove == 1 && xMove == 0 && !end.has_piece()){
            return true;
        }
        if(yMove == 2 && xMove == 0 && !end.has_piece() && !this.hasMoved){
            return true;
        }
        if(yMove == 1 && Math.pow(xMove,2) == 1 && end.has_piece()){
            return true;
        }
        return false;
    }
    
}
class Bishop extends Piece {

    static whitePath = "white_knight.png";
    static blackPath = "black_knight.png";
    constructor(isWhite){
        super(isWhite);
        this.path += this.white ? Bishop.whitePath : Bishop.blackPath;
    }
    canMove(start,end){
        if(!super.canMove(start,end)){
            return false;
        }
        const y_move = start.row - end.row;
        const x_move = start.column - end.column
        if(Math.abs(x_move) != Math.abs(y_move)) {
            return false;
        }
        if(!start.board.getPart(start.column,start.row,x_move,y_move)){
            return false;
        }
        return true;
    }
}
class Knight extends Piece {

    static whitePath = "white_horse.png";
    static blackPath = "black_horse.png";
    constructor(isWhite){
        super(isWhite);
        this.path += this.white ? Knight.whitePath : Knight.blackPath;
    }
    canMove(start,end){
        if(!super.canMove(start,end)){
            return false;
        }
        const y_move = Math.abs(start.column - end.column);
        const x_move = Math.abs(start.row-end.row);
        if(y_move > 0 && x_move > 0 && x_move + y_move == 3) {
            return true;
        }
        return false;
    }
}