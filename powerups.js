function RainbowLaser(){
	this.c = [int(random(0, 255)), int(random(0, 255)), int(random(0, 255))];
	this.colour = 'rgba(' + this.c[0] + ', ' + this.c[1] + ', ' + this.c[2] + ', ' + this.strength + ')';
	for(i = 0; i < lasers.length; i++){
		lasers[i].updateLaser(this.colour);
	}
}