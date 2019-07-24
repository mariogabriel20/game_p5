class Player{

	constructor(x,y,velX,w,h){
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.w = w;
		this.h = h;
		this.xdir = 0;
		this.points = 0;
		this.image = playerImg;
	}

	show(){
		fill(255,0,0);
		triangle(this.x+12,this.y+88,this.x+50,this.y+30,this.x+88,this.y+88);
		image(this.image,this.x,this.y);
		/*rect(this.x,this.y,this.w,this.h);
		noStroke();
		fill(255,0,0);*/

	}

	collides(enemy){
		if(this.x + 88 >= enemy.x && this.x + 12 <= enemy.x + enemy.w){
			if(this.y + 30 <= enemy.y + enemy.h){
				if(this.x + 50 >= enemy.x && this.x + 50 <= enemy.x + enemy.w){
					return true;
				}
			}
			if(this.y + 84 <= enemy.y + enemy.h){
				if(this.x + 88 >= enemy.x && this.x + 12 <= enemy.x + enemy.w){
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

	score(){
		this.points++;
	}

	setDir(dir){
		this.xdir = dir;
	}

	move(dir){
		this.x += velX*this.xdir;
	}

}