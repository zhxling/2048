function showNumberWithAnimotion(i,j,randNumber){
	var number_cell=$("#number-cell-"+i+"-"+j);

	number_cell.css({
		"background-color":getNumberBackgroundColor(randNumber),
        "color":getNumberColor(randNumber),
	});
	number_cell.text(randNumber);

	number_cell.animate({
		"width":cellSideLength+"px",
		"height":cellSideLength+"px",
		"top":getPosTop(i)+"px",
		"left":getPosLeft(j)+"px",
	},50)
}
function showMoveAnimotion(fromX,fromY,toX,toY){
	var number_cell=$("#number-cell-"+fromX+"-"+fromY);
	number_cell.animate({
		"top":getPosTop(toX)+"px",
		"left":getPosLeft(toY)+"px",
	},200);
}

// 更新分数：
function updateScore(addScore){
	$("#score").text(score);
	addscoreAnimotion(addScore);
}

function addscoreAnimotion(addScore){
	$("#score").append("<span class='addScore'></span>");
	$(".addScore").text("+"+addScore);

	$(".addScore").animate({
		"font-size":"0px",
		"top":"-80px",
	},1000);
}
