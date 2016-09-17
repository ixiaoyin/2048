function showNumberWithAnimation(i,j,randomNum){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css('backgroundColor',getNumberBackColor(randomNum));
	numberCell.css('color',getNumColor(randomNum));
	numberCell.text(randomNum);

	numberCell.animate({
		width:gridCellWidth+'px',
		height:gridCellWidth+'px',
		top:getTop(i,j)+'px',
		left:getLeft(i,j)+'px'
	}, 50);
};

function showNumberMove(formX,formY,toX,toY){
	var numberCell=$("#number-cell-"+formX+"-"+formY);
	numberCell.animate({
		top:getTop(toX,toY)+'px',
		left:getLeft(toX,toY)+'px'		
	}, 200)
};

function showScore(score){
	$('#score').text(score);
}