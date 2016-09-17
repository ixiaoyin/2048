var board=new Array();
var score=0;
var hasConflicted=new Array();

var startX=0;
	startY=0;
	endX=0;
	endY=0;
	diffX=0;
	diffY=0;
$(document).ready(function(){
	prepareForMobile();
	newGame();
});
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerLength=500;
		gridCellWidth=100;
		gridCellPadding=20;
	}
	$('#grid-container').css('width',gridContainerLength-2*gridCellPadding);
	$('#grid-container').css('height',gridContainerLength-2*gridCellPadding);
	$('#grid-container').css('padding',gridCellPadding);
	$('#grid-container').css('border-radius',0.02*gridContainerLength);

	$('.grid-cell').css('width',gridCellWidth);
	$('.grid-cell').css('height',gridCellWidth);
	$('.grid-cell').css('border-radius',0.02*gridCellWidth);
}

document.addEventListener('touchstart',function(event){
	startX=event.touches[0].pageX;
	startY=event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});
document.addEventListener('touchend',function(event){
	endX=event.changedTouches[0].pageX;
	endY=event.changedTouches[0].pageY;

	diffX=endX-startX;
	diffY=endY-startY;

	if(Math.abs(diffX)<0.2*documentWidth && Math.abs(diffY)<0.2*documentWidth){
		return;
	}
	if(Math.abs(diffX)>=Math.abs(diffY)){
		//X轴滑动
		if(diffX>0){
			//moveRight
			if(moveRight()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}		
		}else{
			if(moveLeft()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
		}
	}else{
		//Y轴滑动
		if(diffY>0){
			if(moveDown()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
		}else{
			if(moveTop()){
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
		}
	}

});

function newGame(){
	//初始化棋盘格
	init();
	//随机在两个位置生成数字
	generateOneNumber();
	generateOneNumber();
};
function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getTop(i,j));
			gridCell.css('left',getLeft(i,j));
		}
	}
	for(var i=0;i<4;i++){
		board[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;			
		}
	}
	for(var i=0;i<4;i++){
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){		
			hasConflicted[i][j]=false;
		}
	}
	updateBoardView();
	var score=0;
};

//
function updateBoardView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell=$("#number-cell-"+i+"-"+j);

			if(board[i][j]==0){
				numberCell.css('height','0px');
				numberCell.css('width','0px');
				numberCell.css('top',getTop(i,j)+gridCellWidth/2+'px');
				numberCell.css('left',getLeft(i,j)+gridCellWidth/2+'px');
			}else{
				numberCell.css('height',gridCellWidth+'px');
				numberCell.css('width',gridCellWidth+'px');
				numberCell.css('top',getTop(i,j));
				numberCell.css('left',getLeft(i,j));

				numberCell.css('backgroundColor',getNumberBackColor(board[i][j]));				
				numberCell.css('color',getNumColor(board[i][j]));
				
				numberCell.text(board[i][j]);
			}

			hasConflicted[i][j]=false;
		}
	}
	$('.number-cell').css('line-height',gridCellWidth+'px');
	$('.number-cell').css('font-size',0.6*gridCellWidth+'px');
};

function generateOneNumber(){
	if(noSpace(board)){				
		return false;
	}else{
		//随机生成一个位置
		var randomX=parseInt(Math.floor(Math.random()*4));
		var randomY=parseInt(Math.floor(Math.random()*4));
		while(true){
			if(board[randomX][randomY]==0){
				break;
			}else{
				randomX=parseInt(Math.floor(Math.random() * 4));
				randomY=parseInt(Math.floor(Math.random() * 4));				
			}
		}
		//随机生成一个数字
		var randomNum=Math.random() < 0.7 ? 2 : 4;
		//位置中放入数字
		board[randomX][randomY]=randomNum;
		showNumberWithAnimation(randomX,randomY,randomNum);
		return true;
	}

};

//
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				event.preventDefault();
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		case 38://top
			if(moveTop()){
				event.preventDefault();
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		case 39://right
			if(moveRight()){
				event.preventDefault();
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		case 40://down
			if(moveDown()){
				event.preventDefault();
				setTimeout('generateOneNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;									
		default:
			break;
	}
});

function isGameOver(){
	if(noSpace(board) && !noMove()){
		gameOver();
	}
};

function gameOver(){
	alert('gameOVer!');
}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}else{ 
		//moveLeft
		for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(board[i][j]!=0){
					//判断之前位置是否有数字
					for(var k=0;k<j;k++){
						//前面没数字并且两个数字之前没有障碍
						if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
							//move
							showNumberMove(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){		//两个数字相等并且没有障碍
							//move
							showNumberMove(i,j,i,k);							
							//add
							board[i][k]=board[i][k]+board[i][j];
							board[i][j]=0;
							//add score
							score += board[i][k];
							showScore(score);

							hasConflicted[i][k]=true;
							continue;
						}
					}
				}
			}
		}
		//
		setTimeout('updateBoardView()',200);
		return true;
	}
};

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}else{
		//moveRight
		for(var i=0;i<4;i++){
			for(var j=2;j>=0;j--){
				if(board[i][j]!=0){
					//判断之后位置是否有数字
					for(var k=3;k>j;k--){
						//前面没数字并且两个数字之前没有障碍
						if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
							//move
							showNumberMove(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){		//两个数字相等并且没有障碍
							//move
							showNumberMove(i,j,i,k);							
							//add
							board[i][k]=board[i][k]+board[i][j];
							board[i][j]=0;
							//add score
							score += board[i][k];
							showScore(score);							

							hasConflicted[i][k]=true;
							continue;
						}
					}
				}
			}
		}
		//
		setTimeout('updateBoardView()',200);
		return true;
	}
};

function moveTop(){
	if(!canMoveTop(board)){
		return false;
	}else{
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<i;k++){
						if(board[k][j] == 0 && noBlockVertical(k,i,j,board)){
							//move
							showNumberMove(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j] && noBlockVertical(k,i,j,board) && !hasConflicted[k][j]){
							//move
							showNumberMove(i,j,k,j);
							//add
							board[k][j] = board[k][j]+board[i][j];
							board[i][j] = 0;
							//add score
							score += board[i][k];
							showScore(score);	

							hasConflicted[k][j]	=true;					
							continue;
						}
					}
				}
			}
		}
		setTimeout('updateBoardView()',200);
 		return true;	
	}
};

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}else{
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=3;k>i;k--){
						if(board[k][j] == 0 && noBlockVertical(i,k,j,board)){
							//move
							showNumberMove(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j] && noBlockVertical(i,k,j,board) && !hasConflicted[k][j]){
							//move
							showNumberMove(i,j,k,j);
							//add
							board[k][j] = board[k][j]+board[i][j];
							board[i][j] = 0;
							//add score
							score += board[i][k];
							showScore(score);

							hasConflicted[k][j]=true;							
							continue;
						}
					}
				}
			}
		}
		setTimeout('updateBoardView()',200);
 		return true;	
	}
};