var time = 0;
var timer;
var step = 0;
var isStart = false;
var nowNumArr = [[1,2,3],[4,5,6],[7,8,0]];
var finslNumArr = [[1,2,3],[4,5,6],[7,8,0]];
var posXY = new Array(
        [0,0],
        [0,150],
        [0,300],
        [150,0],
        [150,150],
        [150,300],
        [300,0],
        [300,150]
    );


// 初始化
function init() {
	$('.number').removeClass('animation');
	$('.number').each(function (e) {
		var number = $('.number')[e];
		var posX = posXY[e][0];
		var posY = posXY[e][1];
		$(number).css({'top':posX,'left':posY});
	});

	for (var i = 0; i < 100; i++) {
		var x = Math.floor(Math.random()*8);
		var e = $('.number')[x];
		move(e);
	}

	$('#mask').show();
}


//开始游戏
function start() {
	$('#mask').hide();
	$('.number').addClass('animation');
	isStart = true;
	timer = setInterval(function(){
		time++;
		$('#time').html(time);
	},1000);
}

//重新开始
function again() {
	isStart = false;
	$('.number').removeClass('animation');
	clearInterval(timer);
	step = 0;
	time = 0;
	$('#step').html(step);
	$('#time').html(time);
	for (var i = 0; i < 100; i++) {
		var x = Math.floor(Math.random()*8);
		var e = $('.number')[x];
		move(e);
	}
	$('#mask').show();
}


/*
 * 获取要移动div并判断是否可移动
 * e: 要移动的div
 */
function move(e) {
	var numberID = $(e).attr('data-title');
	var xy = numberID.match(/\d/g);
	var x = parseInt(xy[0]);
	var y = parseInt(xy[1]);
	var result = canMove(x,y);
	if (result === 0) {
		return;
	}
	var clickNumber = nowNumArr[x][y];
	switch(result){
		case 'up':
			nowNumArr[x][y] = 0;
			nowNumArr[x-1][y] = clickNumber;
			$(e).attr('data-title','number_'+(x-1)+'_'+y);
			moveNumber(e,result);
			break;
		case 'down':
			nowNumArr[x][y] = 0;
			nowNumArr[x+1][y] = clickNumber;
			$(e).attr('data-title','number_'+(x+1)+'_'+y);
			moveNumber(e,result);
			break;
		case 'left':
			nowNumArr[x][y] = 0;
			nowNumArr[x][y-1] = clickNumber;
			$(e).attr('data-title','number_'+x+'_'+(y-1));
			moveNumber(e,result);
			break;
		case 'right':
			nowNumArr[x][y] = 0;
			nowNumArr[x][y+1] = clickNumber;
			$(e).attr('data-title','number_'+x+'_'+(y+1));
			moveNumber(e,result);
			break;
		default:
			break;

	}
}

/*
 * 移动div
 * e:要移动的div
 * direction：移动的方向
 */
function moveNumber(e,direction) {
	var posX = parseInt($(e).css('top'));
	var posY = parseInt($(e).css('left'));
	switch(direction){
		case 'up':
			$(e).css({'top':posX-150});
			gameOver();
			break;
		case 'down':
			$(e).css({'top':posX+150-0});
			gameOver();
			break;
		case 'left':
			$(e).css({'left':posY-150});
			gameOver();
			break;
		case 'right':
			$(e).css({'left':posY+150});
			gameOver();
			break;
		default:
			break;
	}
}

/*
 * 获取空的div的位置
 */
function getZero() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (nowNumArr[i][j] === 0) {
				return i+','+j;
			}
		}
	}
}

/*
 * 判断要移动的div是否可以移动
 * i: 二维数组的横坐标
 * j: 二位数组的纵坐标
 */
function canMove(i,j) {
	var direction = 'null';
	var zero = getZero();
	var arr = zero.split(',');
	var x = parseInt(arr[0]);
	var y = parseInt(arr[1]);
	if (((i-1) == x)&&(y==j)) {
		direction = 'up';
		return direction;
	}
	if ((i == x)&&(y==(j-1))) {
		direction = 'left';
		return direction;
	}
	if ((i == x)&&((j+1)==y)) {
		direction = 'right';
		return direction;
	}
	if (((i+1) == x)&&(y==j)) {
		direction = 'down';
		return direction;
	}
	return 0;
}

/*
 * 判断是否排列完成
 */
function gameOver() {
	if (!isStart) {
		return;
	}
	step+=1;
	$('#step').html(step);
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (nowNumArr[i][j] != finslNumArr[i][j]) {
				return false;
			}
		}
	}
	clearInterval(timer);
	timer = 0;
	step = 0;
	setTimeout(function () {
		alert('gameOver');
	},300);
	return true;
}