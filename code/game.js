//Help Sources
//http://eloquentjavascript.net/15_game.html
//https://github.com/AMSUCF/JSPlatformer/tree/1e8c5596c07eb61ae48c9593b693515a88c78669


var actorChars = {
  '@': Player,
  'o': Coin,
  '=': Lava, '|': Lava, 'v': Lava,
  'A': LavaMove,
  '&': Enemy,
  '^': Spike, '<': Spike, '>': Spike, 'v': Spike,
  '~': Water,
  //'*': ExtraLife
  //'L': Life
  
  /*
  //Colors
  'O' : WallOrange,
  'B' : WallBlue,
  'N' : WallBrown,
  'G' : WallGreen,
  'L' : WallLime
  */
};

var lives = 3;
var levelNum = 0;

function Level(plan) {
  // Use the length of a single row to set the width of the level
  this.width = plan[0].length;
  // Use the number of rows to set the height

  this.height = plan.length;

  // Store the individual tiles in our own, separate array
  this.grid = [];
  this.actors = [];

  // Loop through each row in the plan, creating an array in our grid
  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];

    // Loop through each array element in the inner array for the type of the tile
    for (var x = 0; x < this.width; x++) {
      // Get the type from that character in the string. It can be 'x', '!' or ' '
      // If the character is ' ', assign null.

      var ch = line[x], fieldType = null;
	  var Actor = actorChars[ch];
      if (Actor)
      /*
	  // Use if and else to handle the three cases
      if (ch==='@')
        // Create a new player at that grid position.
		*/
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      // Because there is a third case (space ' '), use an "else if" instead of "else"
      else if (ch == "!")
        fieldType = "lava";

      // "Push" the fieldType, which is a string, onto the gridLine array (at the end).
      gridLine.push(fieldType);
    }
    // Push the entire row onto the array of rows.
	this.grid.push(gridLine);
  }
	this.player = this.actors.filter(function(actor) {
		return actor.type == "player";
	})[0];
	this.status = this.finishDelay = null;
}

//Determines if a level is done
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}

// Vector arithmetic: v_1 + v_2 = <a,b>+<c,d> = <a+c,b+d>
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// Vector arithmetic: v_1 * factor = <a,b>*factor = <a*factor,b*factor>
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

//******************************************************************************
//OBJECTS
//******************************************************************************

// A Player has a size, speed and position.
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

// An Enemy has a size, speed and position.
function Enemy(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(2, 0);
}
Enemy.prototype.type = "enemy";

// Lava type, position, and speed
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == '=') {
    this.speed = new Vector(2, 0);
  } else if (ch == '|') {
    this.speed = new Vector(0, 2);
  }else if (ch == 'v') {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

// Moving Lava position, and speed
function LavaMove(pos) {
  this.pos = pos;
  this.size = new Vector(1, 1);
}
LavaMove.prototype.type = "lava";
/*
// Life Counter position, and speed
function LifeCount(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(.3, .3);
}
if (lives == 3){
	LifeCount.prototype.type = "life3";
}
else if(lives == 2){
	LifeCount.prototype.type = "life2";
}
else if(lives == 1){
	LifeCount.prototype.type = "life1";
}
else
	LifeCount.prototype.type = "life0";
*/
//Spike type and position
function Spike(pos,ch) {
  this.pos = pos;
  //this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  if (ch == '^') {
    this.size = new Vector(.4, 1);
  } else if (ch == '<') {
    this.size = new Vector(1, .4);
  }else if (ch == '>') {
    this.size = new Vector(1, .4);
  }else if (ch == 'v') {
    this.size = new Vector(.4, 1);
	}
}	
Spike.prototype.type = "spike";

//Water position
function Water(pos) {
  this.pos = pos;
  this.size = new Vector(1, 1);
}
Water.prototype.type = "water";

//Coin position and animation
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  //this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";
/*
//ExtraLife position and animation
function ExtraLife(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  //this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
ExtraLife.prototype.type = "extraLife";
*/
// Helper function to easily create an element of a type provided 
// and assign it a class.
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

//Main display class. We keep track of the scroll window using it.
function DOMDisplay(parent, level) {

// this.wrap corresponds to a div created with class of "game"
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

  // In this version, we only have a static background.
  this.wrap.appendChild(this.drawBackground());

  // Keep track of actors
  this.actorLayer = null;

  // Update the world based on player position
  this.drawFrame();
}

var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  console.log(levelNum);
  if(levelNum == 4){
	table = elt("table", "backgroundTwo");
  }
  table.style.width = this.level.width * scale + "px";

  // Assign a class to new row element directly from the string from
  // each tile in grid
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

// Draw the player agent
DOMDisplay.prototype.drawActors = function() {
  // Create a new container div for actor dom elements
  var wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;

  // We want to keep player at least 1/3 away from side of screen
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  // Change coordinates from the source to our scaled.
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

//Clears level when moving to the next scene
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

//Scan the array of actors to see what actors have collided
Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      return other;
  }
};

var maxStep = 0.05;
// Update simulation each step based on keys & step size
Level.prototype.animate = function(step, keys) {
	
	if (this.status != null)
		this.finishDelay -= step;
	
  // Ensure each is maximum 100 milliseconds 
  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};

//******************************************************************************
//OBJECT ACTION
//******************************************************************************

//Lava Action
Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

//Lava Move Action
LavaMove.prototype.act = function(step) {
 this.pos.y -= step;
 this.size.y += (step);

}

//Spike Action
Spike.prototype.act = function(step) {
 this.pos = this.pos;
}

//Water Action
Water.prototype.act = function(step) {
 this.pos = this.pos;
}

//Enemy Action
Enemy.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

//Coin Action
var wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
/*
//Extra Life Action
var wobbleSpeed = 8, wobbleDist = 0.07;
ExtraLife.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
*/
//Checking to see what is in the stage and say what it does
Level.prototype.obstacleAt = function(pos, size){
	var xStart = Math.floor(pos.x);
	var xEnd = Math.ceil(pos.x + size.x);
	var yStart = Math.floor(pos.y);
	var yEnd = Math.ceil(pos.y + size.y);
	
	if(xStart <0 || xEnd > this.width || yStart <0 ){
		return 'wall';
	}
	if (yEnd > this.height){
		//console.log('LAVA.');
		return 'lava';
	}
	for(var y = yStart; y < yEnd; y++){
		for(var x = xStart; x < xEnd; x++){
			var fieldType = this.grid[y][x];
			if(fieldType){
				return fieldType;
			}
		}
	}
	
}

var playerXSpeed = 7;
//-----------------------------------Make changes later---------------------------------------
Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
 
};

var gravity = 60;
var jumpSpeed = 32;
var playerYSpeed = 7;
// Y position--------------------------------------------------------
Player.prototype.moveY = function(step, level, keys) {
//this.speed.y = 0;
//if (keys.up) this.speed.y -= playerYSpeed;
// if (keys.down) this.speed.y += playerYSpeed;
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
   if (obstacle) {
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);
  
  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  //*******************DEATH SEQUENCE***************
  // Losing animation
  if (level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
};


//******************************************************************************
//OBJECT COLLISION
//******************************************************************************
//What to do when player touches certain objects
Level.prototype.playerTouched = function(type, actor) {
  //Lava
  if (type == "lava" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } 
  //Spike
  else if (type == "spike" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } 
  //Enemy
  else if (type == "enemy" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } 
  //Water
  else if (type == "water") {
    gravity = 3.5;
	jumpSpeed = 7;
	playerYSpeed = 5;
  }
  /*
  //ExtraLife
  else if (type == "extraLife") {
	this.actors = this.actors.filter(function(other) {
		return other != actor;
	});
    if (lives < 3 && status != "lost"){
		lives++;
	}
  }
 */
  //Coin
  else if (type == "coin") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    if (!this.actors.some(function(actor) {
      return actor.type == "coin";
    })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  }
};


// Arrow key codes for readibility
var arrowCodes = {37: "left", 38: "up", 39: "right", 40: "down"};

// Translate the codes pressed from a key event
function trackKeys(codes) {
  var pressed = Object.create(null);

  // alters the current "pressed" array which is returned from this function. 
  // The "pressed" variable persists even after this function terminates
  // That is why we needed to assign it using "Object.create()" as 
  // otherwise it would be garbage collected

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      // If the event is keydown, set down to true. Else set to false.
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      // We don't want the key press to scroll the browser window, 
      // This stops the event from continuing to be processed
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

// frameFunc is a function called each frame with the parameter "step"
// step is the amount of time since the last call used for animation
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      // Set a maximum frame step of 100 milliseconds to prevent
      // having big jumps
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// This assigns the array that will be updated anytime the player
// presses an arrow key. We can access it from anywhere.
var arrows = trackKeys(arrowCodes);

// Organize a single level and begin animation
function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);

  runAnimation(function(step) {
    // Allow the viewer to scroll the level
    level.animate(step, arrows);
    display.drawFrame(step);
	if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) {
  function startLevel(n) {
    // Create a new level using the nth element of array plans
    // Pass in a reference to Display function, DOMDisplay (in index.html).
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost"){
		lives--;
		if (lives == 0){
			console.log('Game over');
			  startLevel(0);
		}
		else
        startLevel(n);
      }
	  else if (n < plans.length - 1){
		levelNum = n + 1;
        	startLevel(n + 1);
		console.log(n);
		console.log(levelNum);
		gravity = 60;
		jumpSpeed = 32;
		playerYSpeed = 7;
	  }
      else
        console.log("restart");
    });
  }
  startLevel(1);
}
