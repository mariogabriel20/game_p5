class Bullet{
	
	constructor(x,y,w,h,velY,damage,image){
		this.x = x;
		this.y = y;
		this.velY = velY;
		this.w = w;
		this.h = h;
		this.image = image;
		this.damage = damage;
		this.delete = false;
	}

	show(){
		fill(255,0,0);
		if(this.damage == 1){
			image(this.image,this.x - this.w/2 - 17.5,this.y);
		}else{
			image(this.image,this.x - this.w/2 - 12.5,this.y);
		}
	}

	update(){
		this.y -= this.velY;
	}

	disappear(){
		this.delete = true;
	}

	collides(enemy){
		if(this.x + this.w/2 >= enemy.x && this.x - this.w/2 <= enemy.x + enemy.w){
			if(this.y <= enemy.y + enemy.h){
				return true;
			}
		}
		else{
			return false;
		}
	}


}