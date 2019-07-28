class Enemy{

	constructor(vel, life, image){
		this.x = random(canvas.width);
		this.y = -60;
		this.w = 55;
		this.h = 40;
		this.velY = vel;
		this.delete = false;
		this.life = life;
		this.image = image;
	}

	show(){
		fill(255,100,0);
		//rect(this.x,this.y,this.w,this.h)
		image(this.image,this.x - 22,this.y - 9);
	}

	update(){
		this.y += this.velY;
	}

	disappear(){
		this.delete = true;
	}
}