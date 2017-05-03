function Shield(){
	this.pos = new Location(window.innerWidth + int(random(10, 100)), int(random(100, window.innerHeight-100)));
	this.speed = int(random(5, 13));
	this.shield_img = loadImage("resources/powerups/shield.png");
	this.type = "Shield";

	this.display = function(){
		image(this.shield_img, this.pos.x, this.pos.y, this.shield_img.width/12, this.shield_img.height/12);
	}

	this.update = function(){
		this.pos.x -= this.speed;
	}
}