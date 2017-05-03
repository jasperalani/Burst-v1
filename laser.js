function Laser(x, y, p){
	this.pos = new Location(x+40, y+17.5);
	this.speed = int(random(20, 25));
	this.strength = random(0.5, 1);
	if(p == "rainbow"){
		this.c = [int(random(0, 255)), int(random(0, 255)), int(random(0, 255))];
		this.colour = 'rgba(' + this.c[0] + ', ' + this.c[1] + ', ' + this.c[2] + ', ' + this.strength + ')';
	}else{
		this.colour = 'rgba(255, 0, 0, ' + this.strength + ')';
	}

	this.display = function(){
		noStroke();
		fill(this.colour);
		rect(this.pos.x, this.pos.y, 8, 3);
	}

	this.update = function(){
		this.pos.x += this.speed;
	}
}