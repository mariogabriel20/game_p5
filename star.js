class Star{
	
	constructor(){
		this.x = random(canvas.width);
		this.y = 0;
		this.w = 2;
		this.h = 2;
		this.velY = 5;
		this.delete = false;
	}

	show(){
		fill(255,255,255);
		rect(this.x,this.y,this.w,this.h);
		noStroke();
	}

	update(){
		this.y += this.velY;
	}

	disappear(){
		this.delete = true;
	}
}