class PowerUp{
	
	constructor(x,y,w,h,velY,type,image){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.velY = velY;
		this.type = type;
		this.image = image;
		this.zoomP = 1;
		this.aux = null;
		this.delete = false;
	}

	show(){
		if(this.type == 1){
			push();
			imageMode(CENTER);
			translate(this.x + this.w/2,this.y + this.h/2);
			scale(this.zoomP);
			image(this.image,0,0);
			pop();
		}else{
			image(this.image,this.x,this.y);
		}
	}

	update(){
		this.y += this.velY;
	}

	disappear(){
		this.delete = true;
	}
}