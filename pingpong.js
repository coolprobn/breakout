
	var $gameWindow = document.getElementById('game-window');
	var $player = document.getElementById('player');
	var $ball = document.getElementById('ball')

	function Player(){
		var $player = document.createElement('div');
		$player.id = 'player';
		$gameWindow.appendChild($player);
		$player.style.top = 380 + 'px';
    	$player.style.left = 250 + 'px';
    	var posLeft = 250;
    	var posTop = 380;
    	var self = this;

		var goRight = function(){
			if(posLeft < 450){
				posLeft += 50;
			};
    		$player.style.left = posLeft + 'px';

		};
	
		var goLeft = function(){
			if(posLeft > 0){
				posLeft -= 50;
		};
        $player.style.left = posLeft + 'px';
	};

    	document.addEventListener('keydown', function(event) {
    		if(event.keyCode ==37){
	        	goLeft();
	    	}else if(event.keyCode ==39){
	        	goRight();
	    	};	
       	});

       	this.checkCollision = function(another){
       		var posLeft = 250;
    		var posTop = 380;
			var selfTop = self.posTop;
			var anotherTop = another.posTop;
			var selfLeft = self.posLeft;
			var anotherLeft = another.posLeft;
			var selfRight = selfLeft + 150;
			var anotherRight = anotherLeft + 30;
			var selfBottom = self.posTop + 20;
			var anotherBottom = anotherTop + 30;
			debugger

			if(selfLeft<=anotherRight&&selfRight>=anotherLeft&&selfTop==anotherBottom){
				debugger
				
			};
		};

	};

	function Brick(){
		var self = this;
		for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 4; j++) {
			var $brick = document.createElement('div');
			$brick.className = 'brick';
			$gameWindow.appendChild($brick);
			};
		};
		var posTop = $brick.style.top;
		var posLeft = $brick.style.left;
		this.checkBrickCollision = function(another){
			var selfTop = self.posTop;
			var anotherTop = another.posTop;
			var selfLeft = self.posLeft;
			var anotherLeft = another.posLeft;
			var selfRight = selfLeft + 150;
			var anotherRight = anotherLeft + 30;
			var selfBottom = self.posTop + 20;
			var anotherBottom = anotherTop + 30;
			debugger

			if(selfLeft<anotherRight&&selfRight>anotherLeft&&selfTop<anotherBottom&&selfBottom>anotherTop){
			debugger
			}
		}
	};
	
	function Ball(){
		var $ball = document.createElement('div');
		$ball.id = 'ball';
		$gameWindow.appendChild($ball);
    	this.yVelocity = 0;
		this.xVelocity = 0;
   		this.posLeft = 310;
    	this.posTop = 350;
   	 	var self = this;

		var move = function(){
			checkVerticalCollision();
			checkHorizontalCollision();
        	self.posTop += self.yVelocity;
        	self.posLeft += self.xVelocity;
        	$ball.style.top = self.posTop + 'px';
        	$ball.style.left = self.posLeft + 'px';
        	$gameWindow.appendChild($ball);
		};

		setInterval(move,200);

		var checkVerticalCollision = function(){
			if(self.posTop == 0){
		   		self.yVelocity = 10;	
			};
        	if (self.posTop == 350 && self.posLeft == 310) {
        		self.yVelocity = -10;
        	};
        	if(self.posTop == 370){
		   		self.yVelocity = -10;//game-over	
			};

		};

		var checkHorizontalCollision = function(){
			if (self.posLeft == 310 && self.posTop == 350) {
        		self.xVelocity = -10;
        	}else if (self.posLeft == 0) {
        		self.xVelocity = 10;
        	};
        	if (self.posLeft == 570) {
        		self.xVelocity = -10;
        	};
		};
	};

	var p = new Player();
	var b = new Brick();
	var ball = new Ball();
	p.checkCollision(ball);	
	var checkBrickPCollision = function(){
		b.checkBrickCollision(ball);
	}
	checkBrickPCollision();
	//$brick.parentNode.removeChild($brick);