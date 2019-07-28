class Player{

	constructor(x,y,velX,w,h, image){
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.w = w;
		this.h = h;
		this.xdir = 0;
		this.points = 0;
		this.image = image;
	}

	show(){
		image(this.image,this.x,this.y);
	}

	collides(object){
		if(this.x + 88 >= object.x && this.x + 12 <= object.x + object.w){
			if(this.y + 30 <= object.y + object.h){
				if(this.x + 50 >= object.x && this.x + 50 <= object.x + object.w){
					return true;
				}
			}
			if(this.y + 84 <= object.y + object.h){
				if(this.x + 88 >= object.x && this.x + 12 <= object.x + object.w){
					return true;
				}
			}
		}
		else{
			return false;
		}
	}

	changeImg(){
		if(this.image == playerImg){
			this.image = playerImg2;
		}
		else{
			this.image = playerImg;
		}
	}

	score(enemy){
		if(enemy.image == enemyImg){
			this.points++;
		}else{
			this.points += 2;
		}
	}

	setDir(dir){
		this.xdir = dir;
	}

	move(dir){
		this.x += velX*this.xdir;
	}

}