class PowerUp{
	
	constructor(x,y,w,h,velY,image){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.velY = velY;
		this.image = image;
		this.delete = false;
	}

	show(){
		image(this.image,this.x,this.y);
	}

	update(){
		this.y += this.velY;
	}

	disappear(){
		this.delete = true;
	}
}