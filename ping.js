
function All(){

	var $gameWindow = document.getElementById('game-window');
	var $player = document.getElementById('player');
	var $ball = document.getElementById('ball');
	var $scoreWindow = document.getElementById('score-window');
	var $score = document.getElementById('score');
	var count = 0;
	var intervalId;
	var launch = false;
	var leftDirection = false;
	var rightDirection = false;
	var leftIntervalId;
	var rightIntervalId;
	var brickCol = false;
	var brickIntervalId;

	function Player(){
		var $player = document.createElement('div');
		$player.id = 'player';
		$gameWindow.appendChild($player);
		$player.style.top = 430 + 'px';
    	$player.style.left = 250 + 'px';
    	this.posLeft = 250;
    	this.posTop = 430;
    	var self = this;

		var goRight = function(){
			if(self.posLeft < 450){
				self.posLeft += 50;
			};
    		$player.style.left = self.posLeft + 'px';

		};
	
		var goLeft = function(){
			if(self.posLeft > 0){
				self.posLeft -= 50;
		};
        $player.style.left = self.posLeft + 'px';
		};

    	document.addEventListener('keydown', function(event) {
    		if(event.keyCode ==37){
	        	goLeft();
	    	}else if(event.keyCode ==39){
	        	goRight();
	    	};	
       	});

       	self.checkCollision = function(another){
       		//alert('stop');
			var selfTop = self.posTop;
			var anotherTop = another.posTop;
			var selfLeft = self.posLeft;
			var anotherLeft = another.posLeft;
			var selfRight = selfLeft + 150;
			var anotherRight = anotherLeft + 30;
			var selfBottom = self.posTop + 20;
			var anotherBottom = anotherTop + 30;
	

			if(selfLeft<=anotherRight&&selfRight>=anotherLeft&&selfTop==anotherBottom){
				if(launch==true){
						if(leftDirection==true){
							clearInterval(intervalId);
							clearInterval(leftIntervalId);
							clearInterval(rightIntervalId);
							clearInterval(brickIntervalId);
							another.xVelocity = 10;
							another.yVelocity = -10;
							rightIntervalId = setInterval(another.move,50);
							}
						else if(rightDirection==true){
							clearInterval(intervalId);
							clearInterval(rightIntervalId)
							clearInterval(leftIntervalId);
							clearInterval(brickIntervalId);
							another.xVelocity = -10;
							another.yVelocity = -10;
							leftIntervalId = setInterval(another.move,50);
						}
					}
				}
			};
		}



    function Ball(){
		var $ball = document.createElement('div');
		$ball.id = 'ball';
		$gameWindow.appendChild($ball);
		this.yVelocity = 0;
		this.xVelocity = 0;
   		this.posLeft = 310;
    	this.posTop = 400;
   	 	var self = this;

		self.move = function(){
			launch = true;
			itta.checkBrickCollision(b);
			p.checkCollision(b);
			self.checkVerticalCollision();
			self.checkHorizontalCollision();
			
        	self.posTop += self.yVelocity;
        	self.posLeft += self.xVelocity;
        	$ball.style.top = self.posTop + 'px';
        	$ball.style.left = self.posLeft + 'px';
        	$gameWindow.appendChild($ball);
		};

		intervalId = setInterval(self.move,50);

		self.checkVerticalCollision = function(){
			if(self.posTop == 50){
		   		self.yVelocity = 10;	
			};
        	if (self.posTop == 400 && self.posLeft == 310) {
        		self.yVelocity = -10;
        	};
        	
        	if(self.posTop == 420){
		   		alert('game-over');
		   		document.location.reload();

			};

		};

		self.checkHorizontalCollision = function(){
			if (self.posLeft == 310 && self.posTop == 400) {
        		self.xVelocity = -10;
        	}
        	if (self.posLeft == 0) {
        		self.xVelocity = 10;
        		leftDirection = true;
        		rightDirection = false;
        	};
        	if (self.posLeft == 570) {
        		self.xVelocity = -10;
        		rightDirection = true;
        		leftDirection = false;
        	};
		};
	};


	function Brick(){
		var $brick = [];
		this.posTop = 50;
		this.posLeft = 5;
		var self = this;
		var i;
		var j;
		
		for(i=0;i<3;i++){
			$brick[i] = [];
			for (j= 0; j <6; j++) {
				$brick[i][j] = document.createElement('div');
				$brick[i][j].className = 'brick';
				$gameWindow.appendChild($brick[i][j]);
				$brick[i][j].style.top = self.posTop + 'px';
				$brick[i][j].style.left = self.posLeft + 'px';
				self.posLeft = self.posLeft + 98;
			}
			if(i<3){
				self.posLeft = 5;	
				self.posTop = self.posTop + 30;
			}
		}

		self.checkBrickCollision = function(another){
			for(i=0;i<3;i++){
				for(j=0;j<6;j++){
					if(i==0)
						selfTop = 50;
		
					var anotherTop = another.posTop;
					if(j==0)
						selfLeft = 0;
					else
						selfLeft += 98;
				
					var anotherLeft = another.posLeft;
					var selfRight = selfLeft + 98;
					var anotherRight = anotherLeft + 30;
					var selfBottom = selfTop + 30;
					var anotherBottom = anotherTop + 30;

					if(selfLeft<=anotherRight&&selfRight>=anotherLeft&&selfBottom==anotherTop){
						if($brick[i][j].style.display != 'none'){
							//debugger
							$brick[i][j].style.display = 'none';
							count += 1;
							$score.innerHTML = count;
							$scoreWindow.appendChild($score);
							brickCol = true;
								
						}	
					}
				}
			if(i<3){
				selfLeft = 0;	
				selfTop = selfTop + 30;
			}
			}

			if(brickCol==true){
				clearInterval(intervalId);
				clearInterval(leftIntervalId);
				clearInterval(rightIntervalId);
				clearInterval(brickIntervalId);
				another.yVelocity = 10;
				brickIntervalId = setInterval(another.move,50);
				brickCol = false;
			}

			if(count==18){
				alert('Arkako ghar ko 18 ota itta fodis aba paisa ley');
				document.location.reload();
			}
		}
	}

	var p = new Player();
	var b = new Ball();
	var itta = new Brick();
}

	
    var a = new All();
    