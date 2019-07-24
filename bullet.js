class Bullet{
	
	constructor(x,y,velY){
		this.x = x;
		this.y = y;
		this.velY = velY;
		this.w = 5;
		this.h = 40;
		this.delete = false;
	}

	show(){
		fill(255,0,0);
		rect(this.x,this.y,this.w,this.h);
	}

	update(){
		this.y -= this.velY;
	}

	disappear(){
		this.delete = true;
	}

	collides(enemy){
		if(this.x + this.w >= enemy.x && this.x <= enemy.x + enemy.w){
			if(this.y <= enemy.y + enemy.h){
				return true;
			}
		}
		else{
			return false;
		}
	}


}