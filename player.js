class Player{

	constructor(x,y,velX,w,h,health,image){
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.w = w;
		this.h = h;
		this.xdir = 0;
		this.points = 0;
		this.damaged = false;
		this.health = health;
		this.image = image;
	}

	show(){
		image(this.image,this.x - 50,this.y);
	}

	collides(object){
		if(this.x + 38 >= object.x && this.x - 38 <= object.x + object.w){
			if(this.y + 30 <= object.y + object.h){
				if(this.x >= object.x && this.x <= object.x + object.w){
					return true;
				}
			}
			if(this.y + 76 <= object.y + object.h){
				if(this.x + 38 >= object.x && this.x - 38 <= object.x + object.w){
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

	getHurt(){
		if(this.damaged == false){
			tint(255, 123, 123);
			image(this.image,this.x - 50,this.y);
			this.damaged = true;
		}else{
			noTint();
			image(this.image,this.x - 50,this.y);
			this.damaged = false;
		}
		noTint();
	}

	score(enemy){
		if(enemy.image == enemyImg){
			this.points++;
		}else if(enemy.image == enemyImg2){
			this.points += 2;
		}else{
			this.points += 3;
		}
	}

	setDir(dir){
		this.xdir = dir;
	}

	move(dir){
		this.x += velX*this.xdir;
	}

}