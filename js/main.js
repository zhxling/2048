
var hasConflit=new Array(); //保存格子是否叠加过数据的信息
var board=new Array();      //棋盘格格子的数据
var score=0;                //分数

// 触控的位置信息
var startX=0,
    startY=0,
    endX=0,
    endY=0;

$(document).ready(function(){
	prepareForMobile();
    newgame();
    // 事件响应
    alert(documentWidth);
});
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			event.preventDefault();
		    if(moveLeft()){
		        setTimeout("generateOneNumbr()",220);	
		    	setTimeout("isgameover(board)",300);
		    }
		    break;;
		case 38://top
			event.preventDefault();
		    if(moveTop()){
		    	setTimeout("generateOneNumbr()",220);
		    	setTimeout("isgameover(board)",300);
		    }
		    break;
	    case 39://right
	        event.preventDefault();
		    if(moveRight()){
		    	setTimeout("generateOneNumbr()",220);
		    	setTimeout("isgameover(board)",300);
		    }
		    break;
	    case 40://down
	        event.preventDefault();
		    if(moveDown()){
		    	setTimeout("generateOneNumbr()",220);
		    	setTimeout("isgameover(board)",300);
		    }
		    break;
		default:
		break;
	}
});

//为了修复在keydowm事件使用了e.preventDefault(),而导致在安卓机上touch事件可能不被触发的BUG； 
document.addEventListener("touchmove",function(event) {
	event.preventDefault();
});  

document.addEventListener('touchstart',function(event){
	startX=event.touches[0].pageX;
	startY=event.touches[0].pageY;

});

document.addEventListener('touchend',function(event){
    endX=event.changedTouches[0].pageX;
    endY=event.changedTouches[0].pageY;

    deltaX=endX-startX;
    deltaY=endY-startY;

    if(Math.abs(deltaX)<0.3*documentWidth&&Math.abs(deltaY)<0.3*documentWidth){
    	return ;
    }

    if(Math.abs(deltaX)>Math.abs(deltaY)){
    	if(deltaX>0){
    		// moveright
    		if(moveRight()){
		        setTimeout("generateOneNumbr()",220);	
		    	setTimeout("isgameover(board)",300);
		    }
    		
    	}
    	else{
    		// moveLeft
    		if(moveLeft()){
		        setTimeout("generateOneNumbr()",220);	
		    	setTimeout("isgameover(board)",300);
		    }
    	}
    }
    else{
    	if(deltaY>0){
    		// moveDown
    		if(moveDown()){
		        setTimeout("generateOneNumbr()",220);	
		    	setTimeout("isgameover(board)",300);
		    }
    	}
    	else{
    		//moveTop 
    		if(moveTop()){
		        setTimeout("generateOneNumbr()",220);	
		    	setTimeout("isgameover(board)",300);
		    }
    	}
    }
});


// 初始化棋盘格的样式
function prepareForMobile(){
	if(documentWidth>500){
		girdContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$("#grid-container").css({
		"width":girdContainerWidth-2*cellSpace+"px",
		"height":girdContainerWidth-2*cellSpace+"px",
		"padding":cellSpace+"px",
		"border-radius":0.02*girdContainerWidth+"px",
	});

	$(".grid-cell").css({
		"width":cellSideLength+"px",
		"height":cellSideLength+"px",
		"border-radius":0.02*cellSideLength+"px"
	})
}


function newgame(){
	//初始化棋盘格
	init(); 
	// 在随机两个格子生成数字
	generateOneNumbr();
	generateOneNumbr();
}

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var grid_cell=$("#grid-cell-"+i+"-"+j);
			grid_cell.css({
				"top":getPosTop(i)+"px",
				"left":getPosLeft(j)+"px",
			});
		};
	};

	// 将棋盘格上的数据装在一个二维数据里面，定义二维数组,初始化数据
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflit[i]=new Array();
		for(var j=0;j<4;j++){
           board[i][j]=0;
           hasConflit[i][j]=false;
		}
	}
	// 操作游戏时，将相应的样式变化更改到前台
	updateBoardView();
	score=0;
	updateScore();	
}


function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumbercell=$("#number-cell-"+i+"-"+j);

            if(board[i][j]==0){
            	theNumbercell.css({
            		"width":"0px",
            		"height":"0px",
            		"top":getPosTop(i)+cellSideLength/2+"px",
            		"left":getPosLeft(j)+cellSideLength/2+"px",
            	});
            }else {
            	theNumbercell.css({
            		"width":cellSideLength+"px",
            		"height":cellSideLength+"px",
            		"top":getPosTop(i)+"px",
            		"left":getPosLeft(j)+"px",
            		"background-color":getNumberBackgroundColor(board[i][j]),
            		"color":getNumberColor(board[i][j]),
            	});
            	theNumbercell.text(board[i][j]);
            }

            hasConflit[i][j]=false;
		};
	};
	$(".number-cell").css({
		"line-height":cellSideLength+"px",
		"font-size":0.6*cellSideLength+"px",
	})
}

function generateOneNumbr(){
	if(nospace(board)){
		return false;
	}
	// 获取随机位置
	var randx=Math.floor(Math.random()*4),
	    randy=Math.floor(Math.random()*4);
	// 判断该位置是否可用
	var time=0;
	while(time<50){
		if(board[randx][randy]==0){
			break;
		}
		randx=Math.floor(Math.random()*4);
	    randy=Math.floor(Math.random()*4);
	    time++;
	}

	if(time==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
				    randy=j;
				}
			}
		}
	}

	// 获取随机数
	var randomNumber=Math.random()<0.5?2:4;

	// 在随机位置上设置随机数
	board[randx][randy]=randomNumber;
	showNumberWithAnimotion(randx,randy,randomNumber);
	return true;
}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}

	// moveLeft
    for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){

				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						// moveLeft
						showMoveAnimotion(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
						continue;

					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board) && hasConflit[i][k]==false){
                       // moveLeft
                       showMoveAnimotion(i,j,i,k);

                       // add
                       board[i][k]=board[i][j]+board[i][k];
                       board[i][j]=0;

                       // 更改分数
                       score+=board[i][k];
                       updateScore();

                       hasConflit[i][k]=true;
                       continue;
					}
				}
			};
		};
	};

	setTimeout("updateBoardView()",200);

	return true;
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}

	// moveLeft
    for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){

				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						// moveLeft
						showMoveAnimotion(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
						continue;

					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&hasConflit[i][k]==false){
                       // moveLeft
                       showMoveAnimotion(i,j,i,k);
                       board[i][k]=board[i][j]+board[i][k];
                       board[i][j]=0;

                       // add
                        // 更改分数
                       score+=board[i][k];
                       updateScore();

                       hasConflit[i][k]=true;

                       continue;
					}
				}
			};
		};
	};

	setTimeout("updateBoardView()",200);

	return true;
}

function moveTop(){
	if(!canMoveTop(board)){
		return false;
	}

	// moveLeft
    for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[j][i]!=0){

				for(var k=0;k<j;k++){
					if(board[k][i]==0&&noBlockHorizontal(i,k,j,board)){
						// moveLeft
						showMoveAnimotion(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
						continue;

					}
					else if(board[k][i]==board[j][i]&&noBlockVertical(i,k,j,board)&&hasConflit[k][i]==false){
                       // moveLeft
                       showMoveAnimotion(j,i,k,i);
                       board[k][i]=board[j][i]+board[k][i];
                       board[j][i]=0;

                       // add
                        // 更改分数
                       score+=board[k][i];
                       updateScore();

                       hasConflit[k][i]=true;
                       continue;
					}
				}
			};
		};
	};

	setTimeout("updateBoardView()",200);

	return true;
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}

	// moveLeft
    for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[j][i]!=0){

				for(var k=3;k>j;k--){
					if(board[k][i]==0&&noBlockHorizontal(i,j,k,board)){
						// moveLeft
						showMoveAnimotion(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
						continue;

					}
					else if(board[k][i]==board[j][i]&&noBlockVertical(i,j,k,board)&&hasConflit[k][i]==false){
                       // moveLeft
                       showMoveAnimotion(j,i,k,i);
                       board[k][i]=board[j][i]+board[k][i];
                       board[j][i]=0;

                       // add
                       score+=board[k][i];
                       updateScore();

                       hasConflit[k][i]=true;

                       continue;
					}
				}
			};
		};
	};

	setTimeout("updateBoardView()",200);

	return true;
}

// 判断游戏是否结束
function isgameover(board){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function gameover(){
	alert("游戏结束");
}



