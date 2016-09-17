var documentWidth=window.screen.availWidth;

var gridContainerLength=0.92*documentWidth;
var gridCellPadding=0.04*documentWidth;
var gridCellWidth=0.18*documentWidth;
function getTop(i,j){
	return gridCellPadding+(gridCellWidth+gridCellPadding)*i;
};
function getLeft(i,j){
	return gridCellPadding+(gridCellWidth+gridCellPadding)*j;
};

function getNumberBackColor(num){
	switch(num){
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0cb";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67e5f";
			break;
		case 64:
			return "#f65e3b";
			break;	
		case 128:
			return "#edef72";
			break;
		case 256:
			return "edec61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#e6c";
			break;												
		case 8192:
			return "#93c";
			break;

	}
	return "black";
};
function getNumColor(num){
	if(num<=4){
		return "#776e65";
	}else{
		return "white"
	}
};

//判断是否还有生成数字空间
function noSpace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}else{
				return true;
			}
		}
	}
};

function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
};

function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;	
};

//判断水平方向的两个数字之间是否有障碍
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
};
//判断是否可以上移
function canMoveTop(board){
	for(var i=1;i<4;i++){
		for(j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
};

function canMoveDown(board){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断垂直方向的两个数字之间是否有障碍
function noBlockVertical(row1,row2,col,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col] !=0){
			return false;
		}
	}
	return true;
};


//
function noMove(){
	if(canMoveDown() || canMoveLeft() || canMoveRight() || canMoveTop()){
		return true;
	}else{
		return false;
	}
}