class Enemy{

	constructor(w,h,vel,life,damage,image){
		this.x = random(canvas.width);
		this.y = -60;
		this.w = w;
		this.h = h;
		this.velY = vel;
		this.delete = false;
		this.life = life;
		this.damage = damage;
		this.image = image;
	}

	show(){
		if(this.image == enemyImg3){
			image(this.image,this.x - 10,this.y - 10)
		}else{
			image(this.image,this.x - 22,this.y - 9);
		}
	}

	update(){
		this.y += this.velY;
	}

	disappear(){
		this.delete = true;
	}
}