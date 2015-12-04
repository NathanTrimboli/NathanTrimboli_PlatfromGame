	
	
	// Create the canvas areas
	//Game Play Area
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = '768';
	canvas.height = '1026';
	canvas.style.left  = 100+'px';
	canvas.style.top  = 100+'px';
	
	//Outer Game Box Interface
	var canvas2 = document.getElementById('canvas2');
	var ctx2 = canvas2.getContext('2d');
	var ctx3= canvas2.getContext('2d');
	canvas2.width = window.innerWidth;
	canvas2.height = window.innerHeight;
	ctx3.fillStyle = "SaddleBrown";
	ctx3.fillRect(80,80,808,1066);
	ctx2.fillStyle = "Sienna";
	ctx2.fillRect(90,90,788,1046);
	
	canvas2.style.left  = 0+'px';
	canvas2.style.top  = 0+'px';
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
	function resizeCanvas() {
		
	}

	// Level Background
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "images/levels/Spring1.png";
	
	// Controls Background
	var conReady = false;
	var conImage = new Image();
	conImage.onload = function () {
		conReady = true;
	};
	conImage.src = "images/controls.png";

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

	// Game objects
	var dog = {
		speed: 256 // movement in pixels per second
	};
	var sheep = {
		speed: 150 // movement in pixels per second
	};
	var sheepsCaught = 0;

	// Handle keyboard controls
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	// Reset the game when the player catches a sheep
	var first = true;
	var reset = function () {
	if (first){
		dog.x = (canvas.width / 2)-dogImage.width;
		dog.y = (canvas.height / 2)-dogImage.height;
		first = false;
	}
	else{
		dog.x = dog.x;
		dog.y = dog.y;
	}
	
	//Create sheeps from array
	//for (i=0; i < 5; i++){
		// Throw the sheep somewhere on the screen randomly
		sheep.x = 30 + Math.floor(Math.random() * (canvas.width - 80));
		sheep.y = 220 + Math.floor(Math.random() * (canvas.height - 300));
		console.log(sheep.y);
		var monX = Math.floor(Math.random() * (2));
		console.log(monX + ' :MONX');
		sheepImage.src = "images/sheep/SheepR1.png";
		if (monX == 0){
			sheep.speed = -sheep.speed;
			sheepImage.src = "images/sheep/SheepL1.png";
		}
	//}
	};

	//Update game objects
	//Animation looping
	var imgLoop = 1;
	//Out of bounds box paramaters
	var rBounds = 700;
	var lBounds = 20;
	var uBounds = 220;
	var dBounds = 935;
	var aboutFace = 1;
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

	var update = function (modifier) {
	
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
			aboutFace = 3;
			//Light Run State 1
			if(imgLoop == 1){
				dogImage.src = "images/dog/DogL2.png";
				spriteTimer();
				
			}
			//Light Run State 2
			if(imgLoop == 2){
				dogImage.src = "images/dog/DogL2.png";
				spriteTimer();
			}
			//Prevent left out ouf bounds
			if (dog.x<=lBounds){
				dog.x=lBounds;
			}
		}
		// Player holding right
		if (39 in keysDown) { 
			dog.x += dog.speed * modifier;
			aboutFace = 1;
			//Right Run State 1
			if(imgLoop == 1){
				dogImage.src = "images/dog/DogR2.png";
				spriteTimer();
			}
			//Right Run State 2
			if(imgLoop == 2){
				dogImage.src = "images/dog/DogR2.png";
				spriteTimer();
			}
			//Prevent right out ouf bounds
			if (dog.x>=rBounds){
				dog.x=rBounds;
			}
		}
		else{
			if (aboutFace == 1){
			dogImage.src = "images/dog/DogR1.png";
			}
			if (aboutFace == 2){
				dogImage.src = "images/dog/DogR1.png";
			}
			if (aboutFace == 3){
				dogImage.src = "images/dog/DogL1.png";
			}
			if (aboutFace == 4){
				dogImage.src = "images/dog/DogL1.png";
			}
		}
		
		//sheep movemenet
		//Prevent right out ouf bounds
		if (sheep.x>=rBounds){
			sheep.speed = -sheep.speed;
			sheep.x = (sheep.x - 1);
			sheepImage.src = "images/sheep/SheepL1.png";
		}
		//Prevent Left out ouf bounds
		if (sheep.x<=lBounds){
			sheep.speed = -sheep.speed;
			sheep.x = (sheep.x + 1);
			sheepImage.src = "images/sheep/SheepR1.png";
		}
		sheep.x += sheep.speed * modifier;
		
		// Are they touching a sheep?
		if (
			dog.x <= (sheep.x + 32)
			&& sheep.x <= (dog.x + 32)
			&& dog.y <= (sheep.y + 32)
			&& sheep.y <= (dog.y + 32)
		) {
			++sheepsCaught;
			reset();
		}
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

	// Draw everything
	var render = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (dogReady) {
			ctx.drawImage(dogImage, dog.x, dog.y);
		}

		if (sheepReady) {
			ctx.drawImage(sheepImage, sheep.x, sheep.y);
		}

		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Goblins caught: " + sheepsCaught, 32, 32);
	};

	// The main game loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;
		
		//var timer = setInterval(spriteTimer, 1000);
		
		update(delta / 1000);
		render();

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
		
		//If screen is resized
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener('orientationchange', resizeCanvas, false);
		resizeCanvas();
	};

	// Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	// Let's play this game!
	var then = Date.now();
	reset();
	main();
