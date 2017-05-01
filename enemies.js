function Enemy(speed){
	this.pos = new Location(window.innerWidth + int(random(100, 1000)), int(random(100, window.innerHeight-100)));
	this.speed = int(random(15, 20)) + speed;
	this.enemy_img = loadImage("resources/enemies/enemy1.png");

	this.display = function(){
		image(this.enemy_img, this.pos.x, this.pos.y, this.enemy_img.width/4, this.enemy_img.height/4);
	}

	this.update = function(){
		this.pos.x -= this.speed;
	}
}

function bgEnemy(x){
	this.pos = new Location(window.innerWidth + int(random(1000, 2000*x)), int(random(100, window.innerHeight-100)));
	this.speed = int(random(3, 6));
	this.type = x;

	this.img = loadImage("resources/enemies/largeBG" + x + ".png");

	this.display = function(){
		image(this.img, this.pos.x, this.pos.y, this.img.width/2, this.img.height/2);
	}

	this.update = function(){
		this.pos.x -= this.speed;
	}
}