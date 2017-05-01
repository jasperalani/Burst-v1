function Stars(){
	this.pos = new Location(int(random(0, window.innerWidth)), int(random(0, window.innerHeight)));
	this.size = [];
	this.size[0] = 1;
	this.size[1] = (this.size[0] * random(1, 4));
	this.strength = random(0.3, 0.5);
	this.speed = int(random(2, 5));
	this.colour = 'rgba(255, 255, 255, ' + this.strength + ')';

	this.display = function(){
		noStroke();
		fill(this.colour);
		rect(this.pos.x, this.pos.y, this.size[1], this.size[1]);
	}

	this.update = function(){
		this.pos.x -= this.speed;
	}
}