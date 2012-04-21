/* ******* Maya's Birthday ******* */
/* ******* @ Serhio Magpie ******* */

/* serdidg@gmail.com      */
/* http://screensider.com */

var Layout = function(o){
	var that = this,
		config = _.merge({
			'bubbleSize' : 24,
			'lettersWidth' : 260,
			'lettersHeight' : 150,
			'lettersColor' : '#d711de',
			'lettersDelay' : 2000,
			'lettersTime' : 50,
			'colorTimeMin' : 200,
			'colorTimeMax' : 1000,
			'linesWidth' : 590,
			'linesHeight' : 590,
			'linesCount' : 12,
			'linesWeight' : 4,
			'linesSpace' : 8,
			'linesTime' : 300,
			'linesStartMin' : 200,
			'linesStartMax' : 2000,
			'linesDelay' : 1500,
			'linesColors' : ['#feeed7', '#fbdbac', '#fdc97f', '#feb64f', '#ff9600', '#feb64f', '#fdc97f', '#fbdbac'],
			'circleStartMin' : 500,
			'circleStartMax' : 3000,
			'circleSpeed' : 0.7,
			'circleRotateDelay' : 0,
			'colors' : [
				['#f600ff', '#b840bc', '#eb8bee', '#e344e9', '#ff02a9', '#a90571', '#cd05ff', '#9734b0', '#cd88de'],
				['#ff0000', '#c02f2f', '#ff6c00', '#ff4e00', '#ffd800', '#bd0101', '#eb6565', '#efaa04', '#d88050']
			],
			'levels' : [
				{'width' : 250, 'height' : 250, 'bubbles' : 32, 'rotate' : 'cw'},
				{'width' : 230, 'height' : 230, 'bubbles' : 28, 'rotate' : 'cww'}
			]
		}, o),
		pageSize,
		lines = [];
		
	/* Circles */
	
	var renderCircles = function(){
		pageSize = _.getPageSize();
		
		for(var i = 0, l = config['levels'].length; i < l; i++){
			var deg = 360 / config['levels'][i]['bubbles'];
			var box = document.body.appendChild(_.node('div', {'class':'circle'}));
			box.style.width = config['levels'][i]['width'] + 'px';
			box.style.height = config['levels'][i]['height'] + 'px';
			box.style.marginLeft = -config['levels'][i]['width']/2 + 'px';
			box.style.marginTop = -config['levels'][i]['height']/2 + 'px';
			var inner = box.appendChild(_.node('div', {'class':'inner'}));
			// Bubbles
			for(var i2 = 0; i2 < config['levels'][i]['bubbles']; i2++){
				renderCircleItem(i2, inner, deg, i);
			}
			// Rotate
			rotateCircle(inner, config['levels'][i]['rotate'], i);
		}
	};
	
	var renderCircleItem = function(i, wrap, deg, level){
		var deg = i * deg;
		var box = wrap.appendChild(_.node('div', {'class':'block'}));
		
		box.style.MozTransform = 'rotate('+deg+'deg)';
		box.style.WebkitTransform = 'rotate('+deg+'deg)';
		box.style.OTransform = 'rotate('+deg+'deg)';
		box.style.transform = 'rotate('+deg+'deg)';
		
		var bubble = box.appendChild(_.node('div', {'class':'bubble'}));
		bubble.style.width = config['bubbleSize'] + 'px';
		bubble.style.height = config['bubbleSize'] + 'px';
		bubble.style.borderRadius = config['bubbleSize']+'px '+config['bubbleSize']*0.33+'px';
		bubble.style.top = _.rand2(-pageSize['height'], pageSize['height']) + 'px';
		bubble.style.left = _.rand2(-pageSize['width'], pageSize['width']) + 'px';
		
		new _.transition({'el' : bubble, 'style':[['background-color', config['colors'][level][_.rand(0, config['colors'][level].length - 1)], ''], ['left', 0, 'px'], ['top', 0, 'px']], 'time': _.rand2(config['circleStartMin'], config['circleStartMax']), 'delay_out' : 0, 'clear' : false, 'onend':function(){
			animateCircleColor(bubble, 'background-color', level);
		}});
	};
	
	var rotateCircle = function(item, type, i){
		setTimeout(function(){
			var r = 0;
			setInterval(function(){
				item.style.MozTransform = 'rotate('+r+'deg)';
				item.style.WebkitTransform = 'rotate('+r+'deg)';
				item.style.OTransform = 'rotate('+r+'deg)';
				item.style.transform = 'rotate('+r+'deg)';
				if(type == 'cw'){
					r += config['circleSpeed'];
				}else{
					r -= config['circleSpeed'];
				}
			}, 33);
		}, config['circleRotateDelay']);
	};
	
	var animateCircleColor = function(el, type, i){
		var colors = config['colors'][i];
		var c = colors[_.rand(0, colors.length-1)];

		new _.transition({'el' : el, 'style':[[type, c, '']], 'time': _.rand2(config['colorTimeMin'], config['colorTimeMax']), 'delay_out' : 0, 'clear' : false, 'onend':function(){
			animateCircleColor(el, type, i);
		}});
	};
	
	/* Lines */
	
	var renderLines = function(){
		var deg = 360 / config['linesCount'];
		
		var box = document.body.appendChild(_.node('dive', {'class':'lines'}));
		box.style.width = config['linesWidth'] + 'px';
		box.style.height = config['linesHeight'] + 'px';
		box.style.marginLeft = -config['linesWidth']/2 + 'px';
		box.style.marginTop = -config['linesHeight']/2 + 'px';
		
		var inner = box.appendChild(_.node('div', {'class':'inner'}));
		
		for(var i = 0; i < config['linesCount']; i++){
			renderLine(i, inner, deg);
		}
	};
	
	var renderLine = function(i, wrap, deg){
		var deg = i * deg;
		lines.push([]);
		var box = wrap.appendChild(_.node('div', {'class':'block'}));
		
		box.style.MozTransform = 'rotate('+deg+'deg)';
		box.style.WebkitTransform = 'rotate('+deg+'deg)';
		box.style.OTransform = 'rotate('+deg+'deg)';
		box.style.transform = 'rotate('+deg+'deg)';
		
		for(var i2 = 0; i2 < config['linesWeight']; i2++){
			lines[i].push(i2);
			renderLineBubble(i2, box, i);
		}
	};
	
	var renderLineBubble = function(i, wrap, line){
		var bubble = wrap.appendChild(_.node('div', {'class':'bubble'}));
		bubble.style.width = config['bubbleSize'] + 'px';
		bubble.style.height = config['bubbleSize'] + 'px';
		bubble.style.borderRadius = config['bubbleSize'] + 'px';
		bubble.style.top = 0;
		bubble.style.left = 0;
		
		var left = (wrap.offsetWidth - config['bubbleSize'])/2;
		var top = i * (config['bubbleSize'] + config['linesSpace']);
		var color = config['linesColors'][lines[line][i]];
		
		new _.transition({'el' : bubble, 'style':[['background-color', color, ''], ['left', left, 'px'], ['top', top, 'px']], 'time': _.rand2(config['linesStartMin'], config['linesStartMax']), 'delay_out' : 0, 'delay_in' : config['linesDelay'], 'clear' : false});
		setTimeout(function(){
			lines[line][i] = (lines[line][i] + 1 > config['linesColors'].length - 1)? 0 : lines[line][i] + 1;
			animateLineColor(bubble, 'background-color', line, i);
		}, config['linesDelay'] + config['linesStartMax'] );
	};
	
	var animateLineColor = function(el, type, line, i){
		var c = config['linesColors'][lines[line][i]];

		new _.transition({'el' : el, 'style':[[type, c, '']], 'time': config['linesTime'], 'delay_out' : 0, 'clear' : false, 'onend':function(){
			lines[line][i] = (lines[line][i] + 1 > config['linesColors'].length - 1)? 0 : lines[line][i] + 1;
			animateLineColor(el, type, line, i);
		}});
	};
	
	/* Title */
	
	var renderLetters = function(text){
		var box = document.body.appendChild(_.node('div', {'class':'letters'}));
		box.style.width = config['lettersWidth'] + 'px';
		box.style.height = config['lettersHeight'] + 'px';
		box.style.marginLeft = -config['lettersWidth']/2 + 'px';
		box.style.marginTop = -config['lettersHeight']/2 + 'px';
		
		for(var i = 0, l = text.length; i < l; i++){
			box.appendChild(_.node('span', text[i]));
		}
		
		setTimeout(function(){
			animateLetter(text.length, box, 0);
		}, config['lettersDelay']);
	};
	
	var animateLetter = function(l, wrap, i){
		new _.transition({'el' : wrap.childNodes[i], 'style':[['color', config['lettersColor'], '']], 'time': config['lettersTime'], 'onend':function(){
			i++;
			if(i <  l){
				animateLetter(l, wrap, i);
			}
		}});
	};
	
	/* Fake */
	
	var renderFake = function(){
		var el = document.createElement('div');
		el.className = 'all-fake';
		document.body.appendChild(el);
	};
		
	/* Main */
	
	var init = function(){
		if(_.IE6 || _.IE7 || _.IE8 || _.IE9){
			renderFake();
		}else{
			renderCircles();
			renderLines();
			renderLetters('С Днём Рождения Майя!');
		}
	};
	
	init();
};


var Init = function(){
	new Layout();
};

_.addEvent(window, 'load', Init);