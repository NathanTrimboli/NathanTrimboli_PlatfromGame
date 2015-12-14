	//Note sources
	//http://eloquentjavascript.net/16_canvas.html

// ***************************************Convert degrees to number based radians
	function degreesToRadians(degrees) {
		return (degrees * Math.PI)/180;
	}
	
// ***************************************Create the canvas areas
	
	//Game Play Area
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = '768';
	canvas.height = '1026';
	canvas.style.left  = 100+'px';
	canvas.style.top  = 100+'px';
	
	//Outer Game Box Interface and Sky
	var canvas2 = document.getElementById('canvas2');
	var ctx2 = canvas2.getContext('2d');
	var ctx3= canvas2.getContext('2d');
	var ctx4= canvas2.getContext('2d');
	var ctx5 = canvas2.getContext('2d');
	canvas2.width = window.innerWidth;
	canvas2.height = window.innerHeight;
	//Outermost Brown
	ctx3.fillStyle = "#5C3317";
	ctx3.fillRect(80,80,808,1066);
	//Inner Brown
	ctx2.fillStyle = "SaddleBrown";
	ctx2.fillRect(90,90,788,1046);
	canvas2.style.left  = 0+'px';
	canvas2.style.top  = 0+'px';
	
	//Sky
	var grd = ctx4.createLinearGradient(0,0,0,200);
	grd.addColorStop(0,"#0000FF ");
	grd.addColorStop(1,"#00BFFF");
	ctx4.fillStyle = grd;
	ctx4.fillRect(100,100,768,115);
	
	//Sun Timer
	ctx5.fillStyle = "yellow";
	var radius = 50;
	var x = 180; //+ xCircle;
	var y = 15000; //+ yCircle;
	ctx5.beginPath();
	//Create circle
	ctx5.arc(x, y, radius, 0, degreesToRadians(360), true);
	ctx5.fill();
	/*
	//Text box screen Overlay
	var canvas3 = document.getElementById('canvas3');
	var ctx3= canvas3.getContext('2d');
	canvas3.width = window.innerWidth;
	canvas3.height = window.innerHeight;
	ctx3.fillStyle = "#000000";
	ctx3.fillRect(80,80,808,1066);
	canvas3.style.top  = 0+'px';
	canvas3.style.left  = 0+'px';
	*/

	// Level Background
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};

	// dog image
	var dogReady = false;
	var dogImage = new Image();
	dogImage.onload = function () {
		dogReady = true;
	};
	dogImage.src = "images/dog/DogR1.png";
	
	// sheep image
	var sheepReady = false;
	var sheepImage = new Image();
	sheepImage.onload = function () {
		sheepReady = true;
	};
	sheepImage.src = "images/sheep/SheepR1.png";
	
	// wolf image
	var wolfReady = false;
	var wolfImage = new Image();
	wolfImage.onload = function () {
		wolfReady = true;
	};
	wolfImage.src = "images/wolf/WolfR1.png";
	

// ***************************************Game objects Stats
	//Dog
	var dog = {
		speed: 256
	};
	//Sheep
	var sheep = {
		speed: 150
	};
	var sx = 150;
	var sy = 150;
	//Wolf
	var wolf = {
		speed: 120
	};
	var wx = 120;
	var wy = 120;
	
	var ScoreKeep;
	var sheepsCaught = 0;
	var hitCount = 0;

// ***************************************Handle keyboard controls 
	var keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	

// ***************************************Reset the game when the player catches a sheep, wins, or loses
var first = true;
var wolfFirst = true;
var menuScreen = true;
var winLose = false;
var wolfDog = false;

//var wolfSheep = false;
var gameLevel = 1;
var controlSet = 1;


var reset = function () {
	
// ***************************************Check to see if player is moving to next level
	if (sheepsCaught == 500){
		gameLevel += 1;
		first = true;
		wolfFirst = true;
		if (gameLevel == 6){
			winLose = true;
		}
	}
	if (hitCount == 3){
		hitCount =0;
		gameLevel = 7;
		winLose = true;
		first = true;
	}
	
// ***************************************Control Screen and game navigation and controls CONTROLS #0-2 / GAME LEVEL #0-2
	if (menuScreen){
		//Credits Page
		if (gameLevel == 0){
			bgImage.src = "images/levels/controls1.png";
			controlSet = 0;
		}
		//Main Menu
		else if (gameLevel == 1){
			bgImage.src = "images/levels/main.png";
			controlSet = 1;
		}
		//Rules Page 1
		else if (gameLevel == 2){
			bgImage.src = "images/levels/rules1.png";
			controlSet = 2;
		}
	}
// ***************************************Level Screens CONTROL #3 / GAME LEVEL #3-5
	if (!menuScreen){
		
		controlSet = 3;
		if (first){
			//Level Spring
			if (gameLevel == 3){
				console.log('spring');
				bgImage.src = "images/levels/Spring1.png";
				sheepsCaught = 0;
				hitCount = 0;
			}
			//Level Fall
			else if (gameLevel == 4){
				console.log('fall');
				bgImage.src = "images/levels/Spring1.png";
				sheepsCaught = 0;
				hitCount = 0;
			}
			//Level Winter
			else if (gameLevel == 5){
				console.log('winter');
				bgImage.src = "images/levels/Spring1.png";
				sheepsCaught = 0;
				hitCount = 0;
			}
		}
	}
// ***************************************Win Lose States CONTROL #4 / GAME LEVEL #6-7
	if (winLose){
		controlSet = 4;
		//Level Win
		if (gameLevel == 6){
			bgImage.src = "images/levels/win.png";
			sheepsCaught = 0;
			hitCount = 0;
			sheep.y = dog.y + 50;
		}
		//Level Lose
		else if (gameLevel == 7){
			bgImage.src = "images/levels/lose.png";
			sheepsCaught = 0;
			hitCount = 0;
			sheep.y = dog.y + 50;
		}
	}
// ***************************************Character placement upon resets
	if (!menuScreen){
		if(!winLose){
			if (first){
				dog.x = (canvas.width / 2)-dogImage.width;
				dog.y = (canvas.height / 2)-dogImage.height;
			}
			if (wolfDog){
				dog.x = (canvas.width / 2)-dogImage.width;
				dog.y = (canvas.height / 2)-dogImage.height;
			}
			else{
				dog.x = dog.x;
				dog.y = dog.y;
			}
			//Create sheeps from array
			//for (i=0; i < 5; i++){
				if(!wolfDog){
					// Throw the sheep somewhere on the screen randomly
					sheep.x = 30 + Math.floor(Math.random() * (canvas.width - 80));
					sheep.y = 220 + Math.floor(Math.random() * (canvas.height - 300));
					console.log(sheep.y + ' :Sheep Y Cord' + sheep.x + ' :Sheep X Cord');
					var sheepX = Math.floor(Math.random() * (2));
					var sheepY = Math.floor(Math.random() * (2));
					console.log(sheepX + ' :sheepX' + sheepY + ' :sheepY');
					sheepImage.src = "images/sheep/SheepR1.png";
					if (sheepX == 0){
						sheep.speed = -sheep.speed;
						sheepImage.src = "images/sheep/SheepL1.png";
					}
				}
				if (first){
					wolf.x = -100;
					wolf.y = -100;
				}
				
				if(sheepsCaught == 100){
					if (wolfFirst){
						// Throw the wolf somewhere on the screen randomly
						wolf.x = 30 + Math.floor(Math.random() * (canvas.width - 80));
						wolf.y = 220 + Math.floor(Math.random() * (canvas.height - 300));
						console.log(wolf.y + ' :wolf Y Cord' + wolf.x + ' :wolf X Cord');
						var wolfX = Math.floor(Math.random() * (2));
						var wolfY = Math.floor(Math.random() * (2));
						console.log(wolfX + ' :wolfX' + wolfY + ' :wolfY');
						wolfImage.src = "images/wolf/WolfR1.png";
						if (wolfX == 0){
							wolf.speed = -wolf.speed;
							wolfImage.src = "images/wolf/WolfL1.png";
						}
						wolfFirst = false;
					}
				}
				
				//}
			//}
			
			first = false;
			wolfDog = false;
		}
	}
};

// ***************************************Update game objects
	//Animation looping
	var imgLoop = 1;
	//Out of bounds box paramaters
	var rBounds = 700;
	var lBounds = 20;
	var uBounds = 220;
	var dBounds = 935;
	var aboutFace = 1;
	/*
	//Timer Alternation for sprite changes
	function spriteTimer(){
		if (imgLoop == 1){
			imgLoop = 2;
		}
		else{
			imgLoop = 1;
		}
		console.log(imgLoop);
	}
*/
	var update = function (modifier) {
	
// ***************************************CREDITS CONTROLS FOR SET 0
	if (controlSet == 0){
		console.log(controlSet + '&' + gameLevel);
		// Player press right
		if (39 in keysDown) {
			gameLevel = 1;
			reset();
			}
	}

// ***************************************MAIN MENU CONTROLS FOR SET 1
	if (controlSet == 1){
		console.log(controlSet + '&' + gameLevel);
		// Player press left
		if (37 in keysDown) { 
			gameLevel = 0;
			reset();
			}
		// Player press right
		if (39 in keysDown) {
			gameLevel = 2;
			reset();
			}
		// Player press down
		if (38 in keysDown) { 
			gameLevel = 3;
			menuScreen = false;
			winLose = false;
			reset();
			}
	}

// ***************************************RULES CONTROLS FOR SET 2
	if (controlSet == 2){
		console.log(controlSet + '&' + gameLevel);
		// Player press left
		if (37 in keysDown) { 
			gameLevel = 1;
			reset();
			}
		// Player press right
		if (39 in keysDown) {
			gameLevel = 2;
			reset();
			}
		// Player press down
		if (40 in keysDown) { 
			gameLevel = 1;
			reset();
			}
	}

// ***************************************GAME PLAY CONTROLS FOR SET 3
	if (controlSet == 3){
		//console.log(controlSet + '&' + gameLevel);
		// Player holding up
		if (38 in keysDown) {
			dog.y -= dog.speed * modifier;
			//aboutFace = 4;
			//Prevent up out ouf bounds
			if (dog.y<=uBounds){
				dog.y=uBounds;
			}
		}
		// Player holding down
		if (40 in keysDown) { 
			dog.y += dog.speed * modifier;
			//aboutFace = 2;
			//Prevent down out ouf bounds
			if (dog.y>=dBounds){
				dog.y=dBounds;
			}
		}
		// Player holding left
		if (37 in keysDown) {
			dog.x -= dog.speed * modifier;
			aboutFace = 1;
			dogImage.src = "images/dog/DogL2.png";
			//Prevent left out ouf bounds
			if (dog.x<=lBounds){
				dog.x=lBounds;
			}
		}
		else{
			if (aboutFace == 1){
			dogImage.src = "images/dog/DogL1.png";
			}
		}
		// Player holding right
		if (39 in keysDown) { 
			dog.x += dog.speed * modifier;
			aboutFace = 2;
			dogImage.src = "images/dog/DogR2.png";
				
			//Prevent right out ouf bounds
			if (dog.x>=rBounds){
				dog.x=rBounds;
			}
		}
		else{
			if (aboutFace == 2){
				dogImage.src = "images/dog/DogR1.png";
			}
		}
	}
	
// ***************************************WIN LOSE CONTROLS FOR SET 4
	if (controlSet == 4){
		console.log(controlSet + '&' + gameLevel);
		// Player press down
		if (40 in keysDown) { 
			gameLevel = 1;
			menuScreen = true;
			winLose = false;
			reset();
			}
	}
	
// ***************************************CHARACTER MOVEMENT PROPERTIES LOOP
		//sheep movemenet
		//Prevent Right out ouf bounds
		if (sheep.x>=rBounds){
			sx = -sx;
			//sheep.x = (sheep.x - 1);
			sheepImage.src = "images/sheep/SheepL1.png";
		}
		//Prevent Left out ouf bounds
		if (sheep.x<=lBounds){
			sx = -sx;
			//sheep.x = (sheep.x + 1);
			sheepImage.src = "images/sheep/SheepR1.png";
		}
		//Prevent Top out ouf bounds
		if (sheep.y>=uBounds){
			sy = -sy;
			//sheep.y = (sheep.y + 1);
		}
		//Prevent Bottom out ouf bounds
		if (sheep.y<=dBounds){
			sy = -sy;
			//sheep.y = (sheep.y - 1);
		}
		sheep.x += sx * modifier;
		sheep.y += sy * modifier;
		
		// Are they touching a sheep?
		if (
			dog.x <= (sheep.x + 32)
			&& sheep.x <= (dog.x + 32)
			&& dog.y <= (sheep.y + 32)
			&& sheep.y <= (dog.y + 32)
		) {
			//Update the points
			if (!winLose){
			sheepsCaught += 100;
			reset();
			}
			
		};
		
		//wolf movemenet
		//Prevent right out ouf bounds
		if (wolf.x>=rBounds){
			wx = -wx;
			//wolf.x = (wolf.x - 1);
			wolfImage.src = "images/wolf/WolfL1.png";
		}
		//Prevent Left out ouf bounds
		if (wolf.x<=lBounds){
			wx = -wx;
			//wolf.x = (wolf.x + 1);
			wolfImage.src = "images/wolf/WolfR1.png";
		}
		//Prevent Top out ouf bounds
		if (wolf.y>=uBounds){
			wy = -wy;
			//wolf.y = (wolf.y + 1);
		}
		//Prevent Bottom out ouf bounds
		if (wolf.y<=dBounds){
			wy = -wy;
			//wolf.y = (wolf.y - 1);
		}
		wolf.x += wx * modifier;
		wolf.y += wy * modifier;
		
		// Are they touching a wolf?
		if (
			dog.x <= (wolf.x + 32)
			&& wolf.x <= (dog.x + 32)
			&& dog.y <= (wolf.y + 32)
			&& wolf.y <= (dog.y + 32)
		) {
			//Life counter
			if (!winLose){
				if (hitCount < 3){
					hitCount++;
					console.log('OUCH! Life = ' + (3-hitCount));
					wolfDog = true
				} 
				reset();
			}
			
		};
		
		//Did a wolf touch a sheep?
		if (
			sheep.x <= (wolf.x + 32)
			&& wolf.x <= (sheep.x + 32)
			&& sheep.y <= (wolf.y + 32)
			&& wolf.y <= (sheep.y + 32)
		) {
			//Life counter
			if (!winLose){
				if (hitCount < 3){
					hitCount++;
					console.log('OUCH! Life = ' + (3-hitCount));
				} 
				reset();
			}
			
		};
		
		/*
		//Pause and Reset
		//Pause Game
		if (80 in onkeyup) { 
			var pause =false;
			//Keep Paused
			while (pause){
				
				//End Pause
				if (80 onkeyup) {
					pause = false;	
				}
				
			}
		}
		
		//Reset Game
		if (82 in keysUp) { 
			reset();
		}
		*/
	};

//  ***************************************Draw everything
	var render = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (!menuScreen){
			if (!winLose){
				if (dogReady) {
					ctx.drawImage(dogImage, dog.x, dog.y);
				}
				if (sheepReady) {
					ctx.drawImage(sheepImage, sheep.x, sheep.y);
				}
				if (wolfReady) {
					ctx.drawImage(wolfImage, wolf.x, wolf.y);
					console.log('dog ready');
				}
				
				// Score
				ctx.fillStyle = "#5C3317";
				ctx.font = "30px AR Christy";
				ctx.fontWeight = "1000";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				var xTitle = 85;
				if (sheepsCaught > 99){
					xTitle = 70;
				}
				if (sheepsCaught > 999){
					xTitle = 65;
				}
				ctx.fillText("BAH-BAH Points: " + sheepsCaught, xTitle, 158);
				
				// Lives
				var lives = ['O O O','O O X','O X X','X X X'];
				ctx.fillStyle = "#5C3317";
				ctx.font = "30px AR Christy";
				ctx.fontWeight = "1000";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.fillText("Lives: " + lives[hitCount], 490, 158);
			}
		}
	};

//  ***************************************The main game loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;
		
		//var timer = setInterval(spriteTimer, 1000);
		
		update(delta / 1000);
		render();

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};

//  ***************************************Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//  ***************************************Run and update game
	var then = Date.now(); 
	reset();
	main();
