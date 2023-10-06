class Tile {

    constructor(row,column,board){
        this.row = row;
        this.column = column;
        this.board = board;
        this.create_tile();
    }
    create_tile(){
        var tile = document.createElement("p");
        tile.style.position = "fixed"
        tile.draggable = false;
        tile.style.width = 50 + "px";
        tile.style.height = 50 + "px";
        tile.style.padding = 0 + "px"
        tile.style.border = 0 + "px"
        tile.addEventListener('dragover',() => onHover(this));
        var i = 0;
        tile.style.background = "Dimgray"
        if((this.row + this.column)% 2 == 0){
            tile.style.background = "beige"
        }
        const offset = 100;
        const y = this.row * tile.style.width + offset;
        const x = this.column * tile.style.height + offset;
        
        tile.style.left = this.column * 50 + offset + "px";
        tile.style.top = this.row * 50 + offset + "px";
        const root = document.getElementById("root");
        root.appendChild(tile);
        this.docTile = tile;
    }
    displayPiece(piece){
        var pieceImg = document.createElement("img");
        pieceImg.style.position = "relative";
        pieceImg.draggable = true;
        pieceImg.src = piece.path;
        pieceImg.style.padding =0 + "px";
        pieceImg.style.border = 0 + "px";
        pieceImg.style.left = -2 + "px";
        pieceImg.style.top = -5 + "px"
        pieceImg.addEventListener('dragstart',() => onDrag());
        pieceImg.addEventListener('dragend',() => onDrop(this));
        this.docTile.appendChild(pieceImg);
        this.docPiece = pieceImg;
    }
    set_piece(piece){
        this.piece = piece;
        this.displayPiece(this.piece);
    }
    get_piece(){
        if(this.piece){
            return this?.piece;
        }
        return undefined;
    }
    remove_piece(){
        this.docPiece.remove();
        this.piece = undefined;
    }
    has_piece(){
        if(this.piece == undefined){
            return false;
        }
        return true;
    }
}
class Board {

    constructor(){
        this.tiles = this.resetBoard();
        
    }
    resetBoard(){
        var tiles = []
        for(let i = 0; i < 8; i++){
            var temp = []
            for(let j = 0; j < 8; j++){
                temp.push(new Tile(i,j,this));
            }
            tiles.push(temp);
        }
        return tiles;
    }
    getTile(y,x){
        return this.tiles[y][x];
    }
    getPart(startX,startY,x_move,y_move){
        if(Math.max(Math.abs(x_move),Math.abs(y_move)) <= 1){
            console.log("nothing to check")
            return true;
        }
        let x = startX;
        let y = startY;
        for(let i = 0; i< Math.max(Math.abs(x_move),Math.abs(y_move))-1; i++){
            
            let multX = x_move < 0 ? 1 : -1;
            let multY = y_move < 0 ?  1 : -1;
            console.log(x_move,y_move)
            console.log("---------------")
            console.log(multX,multY)
            x += i < Math.abs(x_move) ? multX : 0;
            y += i < Math.abs(y_move) ? multY : 0;
            if(this.tiles[y][x].has_piece()){
                return false;
            }
        }
        return true
    }
    set_king(tile,white){
        if(white){
            this.white_king = tile;
        }
        else{
            this.black_king = tile;
        }
    }
    get_king(white){
        return white ? this.white_king : this.black_king;
    }
    tile_is_threated(tile){
        for(let y = 0; y < this.tiles.length; y++){
            for(let x = 0; x < this.tiles[0].length; x++){
                if(this.tiles[y][x]?.piece?.white == tile?.piece.white || !this.tiles[y][x].has_piece()){
                    continue;
                }
                if(this.tiles[y][x].piece.canMove(this.tiles[y][x],tile)){
                    return true;
                }
                else{
                }
            }
        }
        console.log("not threated");
        return false;
    }
}