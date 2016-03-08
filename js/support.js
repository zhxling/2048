// 获取屏幕可用宽度
documentWidth=window.screen.availWidth;
girdContainerWidth=0.92*documentWidth;  //棋盘格的高和宽
cellSideLength=0.18*documentWidth;      //单元格的高和宽
cellSpace=0.04*documentWidth;           //单元格间距

// 获取top值
function getPosTop(i){
	return cellSpace+i*(cellSideLength+cellSpace);
}
// 获取left值
function getPosLeft(j){
	return cellSpace+j*(cellSideLength+cellSpace);
}
// 获取数字的背景颜色
function getNumberBackgroundColor(number){
	switch (number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65c3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
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
			return "#a6c";
			break;
		default:
			return "black";
			break;
	}
}
// 获取数字颜色
function getNumberColor(number){
    if(number<=4){
    	return "#776a65"
    }
    return "white";
}

// 判断棋盘上是否还有空格
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			};
		};
	};
	return true;
}

// 判断是够否能够向左移动
function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return true;
			};
		};
	};
	return false;
}

// 判断是够否能够向右移动
function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;
			};
		};
	};
	return false;
}

// 判断是够否能够向上移动
function canMoveTop(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[j][i]!=0){
				if(board[j-1][i]==0||board[j-1][i]==board[j][i])
					return true;
			};
		};
	};
	return false;
}

// 判断是够否能够向下移动
function canMoveDown(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[j][i]!=0){
				if(board[j+1][i]==0||board[j+1][i]==board[j][i])
					return true;
			};
		};
	};
	return false;
}

// 判断棋盘是否还可移动
function nomove(board){
	if(canMoveDown(board)
		||canMoveLeft(board)
		||canMoveRight(board)
		||canMoveTop(board)
		){
		return false;
	}
	return true;
}

// 判断可移动两点之间是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0)
			return false;
	}
	return true;
}

function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0)
			return false;
	}
	return true;
}

function onmove(board){
	if(canMoveLeft(board)
		||canMoveRight(board)
		||canMoveDown(board)
		||canMoveTop(board)
		){
		return false;
	}
	return true;
}

