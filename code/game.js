	//Note sources
	//http://eloquentjavascript.net/16_canvas.html
	
	//Things to do
	/*
	CHECK-Multiple sheep aray
	CHECK-Multipl Wolves
	CHECK-Barking on click 
	-Fix menu keyups
	-Make menu clickable as well
	-Art for level 1-3
	-Sheep art
	-Wolf Art dog art
	-Dog bark art
	-Dog lose art
	-Add sound on a timer
	-Add title screens that are timed between level transitions
	*/
// ***************************************Convert degrees to number based radians
	function degreesToRadians(degrees) {
		return (degrees * Math.PI)/180;
	}
	
// ***************************************Create the canvas areas
	//var SCREEN_WIDTH = screen.width - (screen.width * .06);
	//var SCREEN_HEIGHT = screen.height - (screen.height * .15);
	
	//Game Play Area
	/*
	//Text box screen Overlay
	var canvas3 = document.getElementById('canvas3');
	var ctx3= canvas3.getContext('2d');
	canvas3.width = window.innerWidth;
	canvas3.height = window.innerHeight;
	*/
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = '768';
	canvas.height = '1026';
	
	//canvas.style.top  = 100+'px';
	canvas.style.top = (window.innerHeight/2) - (canvas.height/2) +23 +'px';
	canvas.style.left  = (window.innerWidth/2) - (canvas.width /2) +43 +'px';
	//Outer Game Box Interface and Sky
	var canvas2 = document.getElementById('canvas2');
	var ctx2 = canvas2.getContext('2d');
	var ctx3= canvas2.getContext('2d');
	var ctx4= canvas2.getContext('2d');
	var ctx5 = canvas2.getContext('2d');
	canvas2.width = 900;
	canvas2.height = 1200;
	canvas2.style.top = (window.innerHeight/2) - (canvas2.height/2) +'px';
	canvas2.style.left  = (window.innerWidth/2) - (canvas2.width/2) +'px';
	//Outermost Brown
	ctx3.fillStyle = "#5C3317";
	ctx3.fillRect(90,90,808,1066);
	//Inner Brown
	ctx2.fillStyle = "SaddleBrown";
	ctx2.fillRect(100,100,788,1046);
	
	
	//Sky
	var grd = ctx4.createLinearGradient(0,0,0,200);
	grd.addColorStop(0,"#0000FF ");
	grd.addColorStop(1,"#00BFFF");
	ctx4.fillStyle = grd;
	ctx4.fillRect(110,110,768,115);
	
	/*
	//Sun Timer
	ctx5.fillStyle = "yellow";
	var radius = 50;
	var x = 180; //+ xCircle;
	var y = 15000; //+ yCircle;
	ctx5.beginPath();
	//Create circle
	ctx5.arc(x, y, radius, 0, degreesToRadians(360), true);
	ctx5.fill();
	*/
	


	// Level Background
	/*
	var bg1Ready = false;
	var bg1Image = new Image();
	bg1Image.onload = function () {
		bg1Ready = true;
	};
	bg1Image = "https://36.media.tumblr.com/792b5ea02a4465e4d5c73d70eff6b208/tumblr_nze3pbVBcg1s8r79ho1_1280.png";
	*/
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
	
	// sheep2 image
	var sheepReady2 = false;
	var sheepImage2 = new Image();
	sheepImage2.onload = function () {
		sheepReady2 = true;
	};
	sheepImage2.src = "images/sheep/SheepR1.png";
	
	// sheep3 image
	var sheepReady3 = false;
	var sheepImage3 = new Image();
	sheepImage3.onload = function () {
		sheepReady3 = true;
	};
	sheepImage2.src = "images/sheep/SheepR1.png";
	
	// wolf image
	var wolfReady = false;
	var wolfImage = new Image();
	wolfImage.onload = function () {
		wolfReady = true;
	};
	wolfImage.src = "images/wolf/WolfR1.png";
	
	// wolf2 image
	var wolfReady2 = false;
	var wolfImage2 = new Image();
	wolfImage2.onload = function () {
		wolfReady2 = true;
	};
	wolfImage2.src = "images/wolf/WolfR1.png";

// ***************************************Game objects Stats
	//Dog
	var dog = {
		speed: 256
	};
	//Sheep
	var sheep = {
		speed: 100
	};
	var sx = sheep.speed;
	var sy = sheep.speed;
	//Sheep2
	var sheep2 = {
		speed: 100
	};
	var sx2 = sheep2.speed;
	var sy2 = sheep2.speed;
	//Sheep3
	var sheep3 = {
		speed: 100
	};
	var sx3 = sheep3.speed;
	var sy3 = sheep3.speed;
	//Wolf
	var wolf = {
		speed: 100
	};
	var wx = wolf.speed;
	var wy = wolf.speed;
	//Wolf2
	var wolf2 = {
		speed: 100
	};
	var wx2 = wolf2.speed;
	var wy2 = wolf2.speed;
	
	var scoreKeep = 0;
	var sheepsCaught = 0;
	var hitCount = 0;
	var maxLife = 5;
	var dogBark = false;

// ***************************************Handle keyboard controls and mouse
	var keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
	canvas.onclick = function(event) {
		handleClick();
	}
	canvas.ondblclick = function(event) {
		handleDblClick();
	};


// ***************************************Reset the game when the player catches a sheep, wins, or loses
var first = true;
var wolfFirst = true;
var menuScreen = true;
var winLose = false;
var wolfDog = false;

var reSheep1 = true;
var reSheep2 = true;
var reSheep3 = true;

//var wolfSheep = false;
var gameLevel = 1;
var controlSet = 1;
var winStatus = 0;
var detectionArea = 32;

// ***************************************Click Event Handelers
	function handleClick() {
		if (!shiftHold){
			if (!dogBark){
				dogBark = true;
				timerBark = setInterval(waitBark, 200);
				console.log('Bark!');
				dog.x = dog.x - 45;
				dog.y = dog.y - 50;
				detectionArea = 130;
			}
		}
	}
	function handleDblClick() {
		//do nothing
	}
	function waitBark() {
		clearInterval(timerBark); 
		dog.x = dog.x + 45;
		dog.y = dog.y + 50;
		detectionArea = 32;
		dogBark = false;
		console.log('endBark');
		
	}

// ***************************************Reset the game when the player catches a sheep, wins, or loses
var reset = function () {
	
// ***************************************Check to see if player is moving to next level
	/*
	//Sky
	grd = ctx4.createLinearGradient(0,0,0,200);
	grd.addColorStop(0,"#0000FF ");
	grd.addColorStop(1,"#00BFFF");
	ctx4.fillStyle = grd;
	ctx4.fillRect(110,110,768,115);
	*/
	if (sheepsCaught == 2000){
		scoreKeep += sheepsCaught;
		gameLevel += 1;
		first = true;
		wolfFirst = true;
		if (gameLevel == 6){
			winLose = true;
		}
	}
	if (hitCount == maxLife){
		hitCount =0;
		gameLevel = 7;
		winLose = true;
		first = true;
	}
	
// ***************************************Control Screen and game navigation and controls CONTROLS #0-2 / GAME LEVEL #0-2
	if (menuScreen){
		//Credits Page
		if (gameLevel == 0){
			bgImage.src = "http://i.imgur.com/InCmSC5.png";
			controlSet = 0;
		}
		//Main Menu
		else if (gameLevel == 1){
			bgImage.src = "http://i.imgur.com/B1YGgTr.png";
			winStatus = 0;
			controlSet = 1;
		}
		//Rules Page 1
		else if (gameLevel == 2){
			bgImage.src = "http://i.imgur.com/N1iwNyi.png";
			controlSet = 2;
		}
		//Rules Page 2
		else if (gameLevel == 2.2){
			bgImage.src = "http://i.imgur.com/cY1H4Vb.png";
			controlSet = 2;
		}
		//Rules Page 3
		else if (gameLevel == 2.3){
			bgImage.src = "http://i.imgur.com/0RDQyCn.png";
			controlSet = 2;
		}
		//Rules Page 4
		else if (gameLevel == 2.4){
			bgImage.src = "http://i.imgur.com/5FDqSmw.png";
			controlSet = 2;
		}
		//Rules Page 5
		else if (gameLevel == 2.5){
			bgImage.src = "http://i.imgur.com/SDehzJF.png";
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
				bgImage.src = "images/levels/spring.png";
				sheepsCaught = 0;
				hitCount = 0;
			}
			//Level Fall
			else if (gameLevel == 4){
				console.log('fall');
				bgImage.src = "images/levels/spring.png";
				sheepsCaught = 0;
				hitCount = 0;
			}
			//Level Winter
			else if (gameLevel == 5){
				console.log('winter');
				bgImage.src = "images/levels/spring.png";
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
			winStatus = 1;
			bgImage.src = "http://i.imgur.com/LEzjpdJ.png";
			sheepsCaught = 0;
			hitCount = 0;
		}
		//Level Lose
		else if (gameLevel == 7){
			bgImage.src = "http://i.imgur.com/Eyfmt2O.png";
			sheepsCaught = 0;
			hitCount = 0;
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
			if(!wolfDog){
				if (reSheep1){
					// Throw the sheep somewhere on the screen randomly
					sheep.x = 30 + Math.floor(Math.random() * (canvas.width - 90));
					sheep.y = 220 + Math.floor(Math.random() * (canvas.height - 310));
					console.log(sheep.y + ' :Sheep Y Cord' + sheep.x + ' :Sheep X Cord');
					var sheepX = Math.floor(Math.random() * (2));
					var sheepY = Math.floor(Math.random() * (2));
					console.log(sheepX + ' :sheepX' + sheepY + ' :sheepY');
					sheepImage.src = "images/sheep/SheepR1.png";
					if (sheepX == 0){
						sheep.speed = -sheep.speed;
						sheepImage.src = "images/sheep/SheepL1.png";
					}
					reSheep1 = false;
				}
				if (reSheep2){
					// Throw the sheep2 somewhere on the screen randomly
					sheep2.x = 30 + Math.floor(Math.random() * (canvas.width - 120));
					sheep2.y = 220 + Math.floor(Math.random() * (canvas.height - 330));
					console.log(sheep2.y + ' :sheep2 Y Cord' + sheep2.x + ' :sheep2 X Cord');
					var sheepX2 = Math.floor(Math.random() * (2));
					var sheepY2 = Math.floor(Math.random() * (2));
					console.log(sheepX2 + ' :sheep2' + sheepY2 + ' :sheepY');
					sheepImage2.src = "images/sheep/SheepR1.png";
					if (sheepX2 == 0){
						sheep2.speed = -sheep2.speed;
						sheepImage2.src = "images/sheep/SheepL1.png";
					}
					reSheep2 = false;
				}
				if (reSheep3){
					// Throw the sheep3 somewhere on the screen randomly
					sheep3.x = 30 + Math.floor(Math.random() * (canvas.width - 130));
					sheep3.y = 220 + Math.floor(Math.random() * (canvas.height - 350));
					console.log(sheep3.y + ' :sheep3 Y Cord' + sheep3.x + ' :sheep3 X Cord');
					var sheepX3 = Math.floor(Math.random() * (2));
					var sheepY3 = Math.floor(Math.random() * (2));
					console.log(sheepX3 + ' :sheepX3' + sheepY3 + ' :sheepY3');
					sheepImage3.src = "images/sheep/SheepR1.png";
					if (sheepX3 == 0){
						sheep3.speed = -sheep3.speed;
						sheepImage3.src = "images/sheep/SheepL1.png";
					}
					reSheep3 = false;
				}
			}
			//Object rules for Level 1 Spring
			if (gameLevel == 3){
				if (first){
					wolf.x = -100;
					wolf.y = -100;
				}
				if(sheepsCaught == 100){
					if (wolfFirst){
						// Throw the wolf somewhere on the screen randomly
						wolf.x = 30 + Math.floor(Math.random() * (canvas.width - 90));
						wolf.y = 220 + Math.floor(Math.random() * (canvas.height - 310));
						console.log(wolf.y + ' :wolf Y Cord' + wolf.x + ' :wolf X Cord');
						var wolfX = Math.floor(Math.random() * (2));
						var wolfY = Math.floor(Math.random() * (2));
						console.log(wolfX + ' :wolfX' + wolfY + ' :wolfY');
						wolfImage.src = "http://i.imgur.com/uRFNZUM.png";
						if (wolfX == 0){
							wolf.speed = -wolf.speed;
							wolfImage.src = "http://i.imgur.com/qyT4MmW.png";
						}
						wolfFirst = false;
					}
				}
			}
			//Object rules for Level 2 Fall
			if (gameLevel == 4){
				
				if (first){
					wolf.x = -100;
					wolf.y = -100;
					wolf2.x = -120;
					wolf2.y = -120;
					sheep.speed = 120;
					sheep2.speed = 120;
					sheep3.speed = 120;
					wolf.speed = 120;
					wolf2.speed = 120;
				}
				if(sheepsCaught == 100){
					if (wolfFirst){
						// Throw the wolf somewhere on the screen randomly
						wolf.x = 30 + Math.floor(Math.random() * (canvas.width - 90));
						wolf.y = 220 + Math.floor(Math.random() * (canvas.height - 310));
						console.log(wolf.y + ' :wolf Y Cord' + wolf.x + ' :wolf X Cord');
						var wolfX = Math.floor(Math.random() * (2));
						var wolfY = Math.floor(Math.random() * (2));
						console.log(wolfX + ' :wolfX' + wolfY + ' :wolfY');
						wolfImage.src = "http://i.imgur.com/uRFNZUM.png";
						if (wolfX == 0){
							wolf.speed = -wolf.speed;
							wolfImage.src = "http://i.imgur.com/qyT4MmW.png";
						}
						wolfFirst = false;
					}
				}
			}
			//Object rules for Level 3 winter
			if (gameLevel == 5){
				if (first){
					wolf.x = -100;
					wolf.y = -100;
					wolf2.x = -120;
					wolf2.y = -120;
					sheep.speed = 140;
					sheep2.speed = 140;
					sheep3.speed = 140;
					wolf.speed = 140;
					wolf2.speed = 140;
				}
				if(sheepsCaught == 100){
					if (wolfFirst){
						// Throw the wolf somewhere on the screen randomly
						wolf.x = 30 + Math.floor(Math.random() * (canvas.width - 90));
						wolf.y = 220 + Math.floor(Math.random() * (canvas.height - 310));
						console.log(wolf.y + ' :wolf Y Cord' + wolf.x + ' :wolf X Cord');
						var wolfX = Math.floor(Math.random() * (2));
						var wolfY = Math.floor(Math.random() * (2));
						console.log(wolfX + ' :wolfX' + wolfY + ' :wolfY');
						wolfImage.src = "http://i.imgur.com/uRFNZUM.png";
						if (wolfX == 0){
							wolf.speed = -wolf.speed;
							wolfImage.src = "http://i.imgur.com/qyT4MmW.png";
						}
						// Throw the wolf2 somewhere on the screen randomly
						wolf2.x = 30 + Math.floor(Math.random() * (canvas.width - 90));
						wolf2.y = 220 + Math.floor(Math.random() * (canvas.height - 310));
						console.log(wolf2.y + ' :wolf2 Y Cord' + wolf2.x + ' :wolf2 X Cord');
						var wolfX2 = Math.floor(Math.random() * (2));
						var wolfY2 = Math.floor(Math.random() * (2));
						console.log(wolfX2 + ' :wolfX2' + wolfY2 + ' :wolfY2');
							wolfImage.src = "http://i.imgur.com/uRFNZUM.png";
						if (wolfX2 == 0){
							wolf2.speed = -wolf2.speed;
							wolfImage.src = "http://i.imgur.com/qyT4MmW.png";
						}
						wolfFirst = false;
					}
				}
			}	
			
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
var shiftHold = false;

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
		// Player press M
		if (77 in keysDown) { 
			gameLevel = 1;
			reset();
		}
	}

// ***************************************MAIN MENU CONTROLS FOR SET 1
	if (controlSet == 1){
		console.log(controlSet + '&' + gameLevel);
		// Player press C
		if (67 in keysDown) { 
			gameLevel = 0;
			reset();
			}
		// Player press R
		if (82 in keysDown) {
			gameLevel = 2;
			reset();
			}
		// Player press P
		if (80 in keysDown) { 
			gameLevel = 3;
			menuScreen = false;
			winLose = false;
			reset();
			}
	}

// ***************************************RULES CONTROLS FOR SET 2
	if (controlSet == 2){
		console.log(controlSet + '&' + gameLevel);
		// Player press M
		if (77 in keysDown) { 
			gameLevel = 1;
			reset();
		}
		// Player press 1
		if (49 in keysDown) { 
			gameLevel = 2;
			reset();
		}
		// Player press 2
		if (50 in keysDown) { 
			gameLevel = 2.2;
			reset();
		}
		// Player press 3
		if (51 in keysDown) { 
			gameLevel = 2.3;
			reset();
		}
		// Player press 4
		if (52 in keysDown) { 
			gameLevel = 2.4;
			reset();
		}
		if (53 in keysDown) { 
		// Player press 5
			gameLevel = 2.5;
			reset();
		}
	}

// ***************************************GAME PLAY CONTROLS FOR SET 3
	// Player holding shift
	if (16 in keysDown) {
		shiftHold = true;
		dog.speed = 400;
	}
	else {
		shiftHold = false;
		dog.speed = 256;
	}
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
			if (!dogBark){
				dogImage.src = "images/dog/DogL2.png";
			}
			else if (dogBark){
				if (!shiftHold){
					dogImage.src = "images/dog/DogL3.png";
					console.log('leftBark');
				}
			}
			//Prevent left out ouf bounds
			if (dog.x<=lBounds){
				dog.x=lBounds;
			}
		}
		else{
			if (aboutFace == 1){
				if(dogBark){
					dogImage.src = "images/dog/DogL3.png";
					console.log('leftBark');
				}
				else{
					dogImage.src = "images/dog/DogL1.png";
				}
			}
		}
		// Player holding right
		if (39 in keysDown) { 
			dog.x += dog.speed * modifier;
			aboutFace = 2;
			if (!dogBark){
				dogImage.src = "images/dog/DogR2.png";
			}
			else if (dogBark){
				if (!shiftHold){
					dogImage.src = "images/dog/DogR3.png";
					console.log('rightBark');
				}
			}
			//Prevent right out ouf bounds
			if (dog.x>=rBounds){
				dog.x=rBounds;
			}
		}
		else{
			if (aboutFace == 2){
				if(dogBark){
					dogImage.src = "images/dog/DogR3.png";
					console.log('leftBark');
				}
				else{
					dogImage.src = "images/dog/DogR1.png";
				}
			}
		}
	}
	
// ***************************************WIN LOSE CONTROLS FOR SET 4
	if (controlSet == 4){
		//console.log(controlSet + '&' + gameLevel);
		// Player press M
		if (77 in keysDown) { 
			gameLevel = 1;
			menuScreen = true;
			winLose = false;
			reset();
			}
	}
	
// ***************************************CHARACTER MOVEMENT PROPERTIES LOOP
// ***************************************sheep movemenet
	if (!winLose){
		if (!menuScreen){
			//Prevent Right out ouf bounds
			if (sheep.x>=rBounds){
				sx = -sx;
				sheepImage.src = "images/sheep/SheepL1.png";
				//sheepFace = 2;
			}
			//Prevent Left out ouf bounds
			if (sheep.x<=lBounds){
				sx = -sx;
				sheepImage.src = "images/sheep/SheepR1.png";
				//sheepFace = 1;
			}
			//Prevent Top out ouf bounds
			if (sheep.y>=uBounds){
				sy = -sy;
			}
			//Prevent Bottom out ouf bounds
			if (sheep.y<=dBounds){
				sy = -sy;
			}
			/*
			if (
				sheep.x <= (sheep2.x + detectionArea)
				&& sheep2.x <= (sheep.x + detectionArea)
				&& sheep.y <= (sheep.y + detectionArea)
				&& sheep2.y <= (sheep.y + detectionArea)
			) {
				sx = -sx;
				sheepImage.src = "images/sheep/SheepL1.png";
			}
			*/
			sheep.x += sx * modifier;
			sheep.y += sy * modifier;
			
			// Are they touching a sheep?
			if (
				dog.x <= (sheep.x + detectionArea)
				&& sheep.x <= (dog.x + detectionArea)
				&& dog.y <= (sheep.y + detectionArea)
				&& sheep.y <= (dog.y + detectionArea)
			) {
				//Handle Collision
				if (!winLose){
					if (dogBark){
						if (hitCount < maxLife){
							hitCount++;
							console.log('OUCH! Life = ' + (maxLife-hitCount));
						} 
						reSheep1 = true;
						reset();
					}
					else{
						//Update the points
						sheepsCaught += 100;
						reSheep1 = true;
						reset();
					}
				}
			};
		// ***************************************sheep2 movemenet
			//Prevent Right out ouf bounds
			if (sheep2.x>=rBounds){
				sx2 = -sx2;
				sheepImage2.src = "images/sheep/SheepL1.png";
			}
			//Prevent Left out ouf bounds
			if (sheep2.x<=lBounds){
				sx2 = -sx2;
				sheepImage2.src = "images/sheep/SheepR1.png";
			}
			//Prevent Top out ouf bounds
			if (sheep2.y>=uBounds){
				sy2 = -sy2;
			}
			//Prevent Bottom out ouf bounds
			if (sheep2.y<=dBounds){
				sy2 = -sy2;
			}
			sheep2.x += sx2 * modifier;
			sheep2.y += sy2 * modifier;
			
			// Are they touching a sheep2?
			if(
				dog.x <= (sheep2.x + detectionArea)
				&& sheep2.x <= (dog.x + detectionArea)
				&& dog.y <= (sheep2.y + detectionArea)
				&& sheep2.y <= (dog.y + detectionArea)
			) {
				//Handle Collision
				if (!winLose){
					if (dogBark){
						if (hitCount < maxLife){
							hitCount++;
							console.log('OUCH! Life = ' + (maxLife-hitCount));
						} 
						reSheep2 = true;
						reset();
					}
					else{
						//Update the points
						sheepsCaught += 100;
						reSheep2 = true;
						reset();
					}
				}
			};
		// ***************************************sheep3 movemenet
			//Prevent Right out ouf bounds
			if (sheep3.x>=rBounds){
				sx3 = -sx3;
				sheepImage3.src = "images/sheep/SheepL1.png";
			}
			//Prevent Left out ouf bounds
			if (sheep3.x<=lBounds){
				sx3 = -sx3;
				sheepImage3.src = "images/sheep/SheepR1.png";
			}
			//Prevent Top out ouf bounds
			if (sheep3.y>=uBounds){
				sy3 = -sy3;
			}
			//Prevent Bottom out ouf bounds
			if (sheep3.y<=dBounds){
				sy3 = -sy3;
			}
			sheep3.x += sx3 * modifier;
			sheep3.y += sy3 * modifier;
			
			// Are they touching a sheep3?
			if (
				dog.x <= (sheep3.x + detectionArea)
				&& sheep3.x <= (dog.x + detectionArea)
				&& dog.y <= (sheep3.y + detectionArea)
				&& sheep3.y <= (dog.y + detectionArea)
			) {
			//Handle Collision
				if (!winLose){
					if (dogBark){
						if (hitCount < maxLife){
							hitCount++;
							console.log('OUCH! Life = ' + (maxLife-hitCount));
						} 
						reSheep3 = true;
						reset();
					}
					else{
						//Update the points
						sheepsCaught += 100;
						reSheep3 = true;
						reset();
					}
				}
			};
		// ***************************************wolf movemenet
			//Prevent right out ouf bounds
			if (wolf.x>=rBounds){
				wx = -wx;
				wolfImage.src = "http://i.imgur.com/uRFNZUM.png";
			}
			//Prevent Left out ouf bounds
			if (wolf.x<=lBounds){
				wx = -wx;
				wolfImage.src = "http://i.imgur.com/qyT4MmW.png";
			}
			//Prevent Top out ouf bounds
			if (wolf.y>=uBounds){
				wy = -wy;
			}
			//Prevent Bottom out ouf bounds
			if (wolf.y<=dBounds){
				wy = -wy;
			}
			wolf.x += wx * modifier;
			wolf.y += wy * modifier;
			
			// Are they touching a wolf?
			if (
				dog.x <= (wolf.x + detectionArea)
				&& wolf.x <= (dog.x + detectionArea)
				&& dog.y <= (wolf.y + detectionArea)
				&& wolf.y <= (dog.y + detectionArea)
			) {
				//Handle Collision
				if (!winLose){
					if (dogBark){
						wx = -wx;
						wy = -wy;
					}
					else{
						if (hitCount < maxLife){
							hitCount++;
							console.log('OUCH! Life = ' + (maxLife-hitCount));
							wolfDog = true
						} 
						reset();
					}
				}
			};
			// Are they touching a wolf2?
			if (
				dog.x <= (wolf2.x + detectionArea)
				&& wolf2.x <= (dog.x + detectionArea)
				&& dog.y <= (wolf2.y + detectionArea)
				&& wolf2.y <= (dog.y + detectionArea)
			) {
				//Handle Collision
				if (!winLose){
					if (dogBark){
						wx2 = -wx2;
						wy2 = -wy2;
					}
					else{
						if (hitCount < maxLife){
							hitCount++;
							console.log('OUCH! Life = ' + (maxLife-hitCount));
							wolfDog = true
						} 
						reset();
					}
				}
			};
			//Did a wolf touch a sheep?
			if (
				sheep.x <= (wolf.x + detectionArea)
				&& wolf.x <= (sheep.x + detectionArea)
				&& sheep.y <= (wolf.y + detectionArea)
				&& wolf.y <= (sheep.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
					} 
					reSheep1 = true;
					reset();
				}
			};
			//Did a wolf touch a sheep2?
			if (
				sheep2.x <= (wolf.x + detectionArea)
				&& wolf.x <= (sheep2.x + detectionArea)
				&& sheep2.y <= (wolf.y + detectionArea)
				&& wolf.y <= (sheep2.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
					} 
					reSheep2 = true;
					reset();
				}
			};
			//Did a wolf touch a sheep3?
			if (
				sheep3.x <= (wolf.x + detectionArea)
				&& wolf.x <= (sheep3.x + detectionArea)
				&& sheep3.y <= (wolf.y + detectionArea)
				&& wolf.y <= (sheep3.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
					} 
					reSheep3 = true;
					reset();
				}
			};
		// ***************************************wolf2 movemenet
			//Prevent right out ouf bounds
			if (wolf2.x>=rBounds){
				wx2 = -wx2;
				wolfImage2.src = "http://i.imgur.com/uRFNZUM.png";
			}
			//Prevent Left out ouf bounds
			if (wolf2.x<=lBounds){
				wx2 = -wx2;
				wolfImage2.src = "http://i.imgur.com/qyT4MmW.png";
			}
			//Prevent Top out ouf bounds
			if (wolf2.y>=uBounds){
				wy2 = -wy2;
			}
			//Prevent Bottom out ouf bounds
			if (wolf2.y<=dBounds){
				wy2 = -wy2;
			}
			wolf2.x += wx2 * modifier;
			wolf2.y += wy2 * modifier;
			
			// Are they touching a wolf2?
			if (
				dog.x <= (wolf2.x + detectionArea)
				&& wolf2.x <= (dog.x + detectionArea)
				&& dog.y <= (wolf2.y + detectionArea)
				&& wolf2.y <= (dog.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
						wolfDog = true
					} 
					reset();
				}
			};
				//Did a wolf2 touch a sheep?
			if (
				sheep.x <= (wolf2.x + detectionArea)
				&& wolf2.x <= (sheep.x + detectionArea)
				&& sheep.y <= (wolf2.y + detectionArea)
				&& wolf2.y <= (sheep.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
					} 
					reSheep1 = true;
					reset();
				}
			};
			//Did a wolf2 touch a sheep2?
			if (
				sheep2.x <= (wolf2.x + detectionArea)
				&& wolf2.x <= (sheep2.x + detectionArea)
				&& sheep2.y <= (wolf2.y + detectionArea)
				&& wolf2.y <= (sheep2.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
					} 
					reSheep2 = true;
					reset();
				}
			};
			//Did a wolf2 touch a sheep3?
			if (
				sheep3.x <= (wolf2.x + detectionArea)
				&& wolf2.x <= (sheep3.x + detectionArea)
				&& sheep3.y <= (wolf2.y + detectionArea)
				&& wolf2.y <= (sheep3.y + detectionArea)
			) {
				//Life counter
				if (!winLose){
					if (hitCount < maxLife){
						hitCount++;
						console.log('OUCH! Life = ' + (maxLife-hitCount));
					} 
					reSheep3 = true;
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
		}
	}
};

//  ***************************************Draw everything
	var render = function () {
		/*
		if (bg1Ready) {
			ctx3.drawImage(bg1Image, 0, 0);
		}*/
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
				if (sheepReady2) {
					ctx.drawImage(sheepImage2, sheep2.x, sheep2.y);
				}
				if (sheepReady3) {
					ctx.drawImage(sheepImage3, sheep3.x, sheep3.y);
				}
				if (wolfReady) {
					ctx.drawImage(wolfImage, wolf.x, wolf.y);
				}
				if (wolfReady2) {
					ctx.drawImage(wolfImage2, wolf2.x, wolf2.y);
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
				var lives = ['O O O O O','O O O O X','O O O X X','O O X X X','O X X X X','X X X X X'];
				ctx.fillStyle = "#5C3317";
				ctx.font = "30px AR Christy";
				ctx.fontWeight = "1000";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.fillText("Lives: " + lives[hitCount], 470, 158);
			}
			/*
			if (winLose){
				if(winStatus){
					// Final Score
					ctx.fillStyle = "#5C3317";
					ctx.font = "50px AR Christy";
					ctx.fontWeight = "1000";
					ctx.textAlign = "left";
					ctx.textBaseline = "top";
					ctx.fillText('Score: ' + scoreKeep, (canvas.width / 3), (canvas.height / 3));
				}
			}
			*/
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
		
		window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas();

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};
	var timer;
	timer = setInterval(resizeCanvas, 20);
	
	function resizeCanvas() {
		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
	}

//  ***************************************Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//  ***************************************Run and update game
	var then = Date.now(); 
	reset();
	main();
