function decodeFen(FEN,board) {
    var letters = FEN.split("");
    var x=0;
    var y=0;
    for(let i = 0; i < letters.length; i++){
        switch(letters[i]){
            case "/":
                x=-1;
                y++;
                break;
            case "q":
                var tile = board.getTile(y,x);
                tile.set_piece(new Queen(false));
                break;
            case "Q":
                var tile = board.getTile(y,x)
                tile.set_piece(new Queen(true));
                break;
            case "k":
                var tile = board.getTile(y,x)
                var king = new King(false);
                tile.set_piece(king);
                board.black_king = tile; 
                break;
            case "K":
                var tile = board.getTile(y,x);
                var king = new King(true);
                tile.set_piece(king);
                board.white_king = tile;
                break;
            case "p":
                var tile = board.getTile(y,x)
                tile.set_piece(new Pawn(false));
                break;
            case "P":
                var tile = board.getTile(y,x)
                tile.set_piece(new Pawn(true));
                break;
            case "n":
                var tile = board.getTile(y,x)
                tile.set_piece(new Knight(false));
                break;
            case "N":
                var tile = board.getTile(y,x)
                tile.set_piece(new Knight(true));
                break;
            case "b":
                var tile = board.getTile(y,x)
                tile.set_piece(new Bishop(false));
                break;
            case "B":
                var tile = board.getTile(y,x)
                tile.set_piece(new Bishop(true));
                break;
            case "r":
                var tile = board.getTile(y,x)
                tile.set_piece(new Rook(false));
                break;
            case "R":
                var tile = board.getTile(y,x)
                tile.set_piece(new Rook(true));
                break;
            default:
                x += parseInt(letters[i]);
        }

        x++;
    }
}
class currentPiece{
    static target;
}
function onDrag(){
}
function onDrop(currentTile){
    console.log(currentTile.piece.white)
    if(currentTile.piece.canMove(currentTile,currentPiece.target)){
        let hasPiece = false;
        let this_piece = undefined;
        if(currentPiece.target.has_piece()){
            hasPiece = true;
            this_piece = currentPiece.target.piece;
            currentPiece.target.remove_piece();
        }
        if(currentTile.piece instanceof King){
            currentTile.board.set_king(currentPiece.target,currentTile.piece.white);
        }
        currentTile.piece.move(currentTile,currentPiece.target)
        if(currentTile.board.tile_is_threated(currentTile.board.get_king(currentPiece.target.piece.white))){

            currentPiece.target.piece.move(currentPiece.target,currentTile)
            if(hasPiece){
                currentPiece.target.set_piece(this_piece)
            }
            if(currentTile.piece instanceof King){
                currentTile.board.set_king(currentTile,currentPiece.target.piece.white);
            }
        }


    }
}   
function onHover(over){
    currentPiece.target = over;
    
}