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
                break;
            case "K":
                var tile = board.getTile(y,x);
                var king = new King(true);
                tile.set_piece(king);
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
    if(currentTile.piece.white != game.currentPlayer.white){
        return;
    }
    if(currentTile.piece.canMove(currentTile,currentPiece.target)){
        let hasPiece = false;
        let this_piece = undefined;
        if(currentPiece.target.has_piece()){
            hasPiece = true;
            this_piece = currentPiece.target.piece;
            currentPiece.target.remove_piece();
        }
        currentTile.piece.move(currentTile,currentPiece.target)
        if(game.board.tile_is_threated(game.board.get_tiles(King))){

            currentPiece.target.piece.move(currentPiece.target,currentTile)
            if(hasPiece){
                currentPiece.target.set_piece(this_piece)
            }
        }
        else if(currentPiece.target.piece instanceof Pawn) {
            currentPiece.target.piece.hasMoved = true;
            game.move()
        }
        else{
            game.move()
        }
    }
}   
function onHover(over){
    currentPiece.target = over;
    
}