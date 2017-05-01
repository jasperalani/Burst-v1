var playing = true;

var stars = [];

var ship;

var lasers = [];
var maxLasers = 3;
var powerup = "none";

var enemies = [];
var bgEnemies = [];
var hitCount = 0;

var waveMultiplier = 0;
var w = true;
var waveCounter = 0;
var wave = 1;
var waveFont;

var V = SAT.Vector;
var C = SAT.Circle;

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);

	ship = new Ship(); // Creating the ship
	enemies.push(new Enemy(0), new Enemy(0), new Enemy(0), new Enemy(0), new Enemy(0)); // Creating 5 enemies
	bgEnemies.push(new bgEnemy(1), new bgEnemy(2)); // Creating background enemy ships
	for(i = 0; i < 100; i++){ 		// Creating background stars
		stars.push(new Stars());
	}
	waveFont = loadFont('resources/fonts/WIDEAWAKEBLACK.ttf'); // Loading the main font
}

function draw(){
	noCursor();
	background(0);

	// Stars Function Calls
	for(i = 0; i < stars.length; i++){
		stars[i].display();
		stars[i].update();
	}

	// Background Enemy Function Calls
	for(i = 0; i < bgEnemies.length; i++){
		bgEnemies[i].display();
		bgEnemies[i].update();
	}

	screenCheck_();

	if(playing && ship != null){

		screenCheck();

		// Title Text
		textSize(43);
		textFont(waveFont);
		stroke(255, 255, 255);
		strokeWeight(5);
		fill(255, 0, 0);
		text("burst", 10, 52);

		// Waves Text
		textSize(28);
		textFont(waveFont);
		stroke(255, 255, 255);
		strokeWeight(5);
		fill(255, 0, 0);
		text("WAVE: " + wave, 10, 84);

		// Lasers Text
		textSize(60);
		textFont(waveFont);
		stroke(255, 255, 255);
		strokeWeight(5);
		fill(255, 0, 0);
		text(3-lasers.length, window.innerWidth-45, 62);

		// Ship Function Calls
		ship.display();
		ship.update();

		if(wave % 10 === 0){
			waveMultiplier = wave / 10;
		}

		if(wave % 25 === 0){
			if(w){
				enemies.push(new Enemy(waveMultiplier * 2));
			}
			w = false;
		}

		if(wave % 25 != 0){
			w = true;
		}

		if(collision()){
			console.log("You were hit!");
			playing = false;
		}

		// Laser Function Calls
		for(i = 0; i < lasers.length; i++){
			lasers[i].display();
			lasers[i].update();
		}

		// Enemy Function Calls
		for(i = 0; i < enemies.length; i++){
			enemies[i].display();
			enemies[i].update();
		}

	}else{

		// Title Text
		textSize(60);
		textFont(waveFont);
		stroke(255, 255, 255);
		strokeWeight(5);
		fill(255, 0, 0);
		text("burst", window.innerWidth/2-45, window.innerHeight/2-200);

		// Waves Text
		textSize(32);
		textFont(waveFont);
		stroke(255, 255, 255);
		strokeWeight(5);
		fill(255, 0, 0);
		text("WAVE: " + wave, window.innerWidth/2-35, window.innerHeight/2-160);

		// Enemies Count Text
		textSize(32);
		textFont(waveFont);
		stroke(255, 255, 255);
		strokeWeight(5);
		fill(255, 0, 0);
		text("ENEMIES: " + hitCount, window.innerWidth/2-40, window.innerHeight/2-120);
	}
}

function screenCheck(){
	if(ship.pos.y <= 120){
		ship.pos.y = 120;
	}else if(ship.pos.y > window.innerHeight - 120){
		ship.pos.y = window.innerHeight - 120;
	}

	for(i = 0; i < lasers.length; i++){
		if(lasers[i].pos.x > window.innerWidth){
			lasers.splice(i, 1);
		}
	}

	for(i = 0; i < enemies.length; i++){
		if(enemies[i].pos.x < 0){
			if(waveCounter != 4){
				waveCounter++;
			}else{
				waveCounter = 0;
				wave++;
			}
			enemies.splice(i, 1);
			enemies.push(new Enemy(waveMultiplier * 2));	
		}
	}
}

function screenCheck_(){
	for(i = 0; i < stars.length; i++){
		if(stars[i].pos.x < 0){
			stars.splice(i, 1);
			stars.push(new Stars());
		}
	}

	for(i = 0; i < bgEnemies.length; i++){
		if(bgEnemies[i].pos.x < 0){
			bgEnemies.push(new bgEnemy(bgEnemies[i].type));
			bgEnemies.splice(i, 1);
		}
	}
}

function collision(){
	if(playing && ship != null){
		for(i = 0; i < enemies.length; i++){
			if(ship != null && enemies != null){
				a = new C(new V(ship.pos.x, ship.pos.y), 15);
				b = new C(new V(enemies[i].pos.x, enemies[i].pos.y), 15);
			}

			response = new SAT.Response();
			collided = SAT.testCircleCircle(a, b, response);
			if(collided == true){
				console.log("You were hit!");
				ship = null;
			}
		}

		for(i = 0; i < lasers.length; i++){
			a = new C(new V(lasers[i].pos.x, lasers[i].pos.y), 3);
			for(i_ = 0; i_ < enemies.length; i_++){
				b = new C(new V(enemies[i_].pos.x, enemies[i_].pos.y), 15);

				response = new SAT.Response();
				collided = SAT.testCircleCircle(a, b, response);
				if(collided == true){
					console.log("You hit an enemy!");
					lasers.splice(i, 1);
					enemies.splice(i_, 1);
					enemies.push(new Enemy(0));
					hitCount++;
				}
			}
		}
	}
}

function fire(){
	if(playing && ship != null){
		if(lasers.length < maxLasers){
			lasers.push(new Laser(ship.pos.x, ship.pos.y, powerup));
		}
	}
}

function mousePressed(){
	fire();
}

function keyPressed(){
	fire();
}

function rainbow(){
	if(playing && ship != null){
		if(powerup == "none"){
			powerup = "rainbow";
		}else{
			powerup = "none";
		}
	}
}