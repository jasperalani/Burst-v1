function Ship(){
	this.pos = new Location(window.innerWidth/5, 150);
	this.ship_img = loadImage("resources/ships/ship.png");
	this.powerup = null;

	this.display = function(){
		image(this.ship_img, this.pos.x, this.pos.y, this.ship_img.width/4, this.ship_img.height/4);
	}

	this.update = function(){
		this.pos.y = mouseY;
		if(this.pos.y <= 120){
			this.pos.y = 120;
		}else if(this.pos.y > window.innerHeight - 120){
			this.pos.y = window.innerHeight - 120;
		}
	}
}

function Location(x_, y_, r_){
	this.x = x_;
	this.y = y_;
}