var player;
var stars = [];
var enemies = [];
var bullets = [];
var enemySpeed = 4;
var bulletSpeed = 10;
var w = 40;
var h = 40;
var velX = 10;
var intervalo = 0;
var gameOver = false;

//imagenes
var playerImg;
var playerImg2;
var enemyImg;

function preload(){
	playerImg = loadImage("Imágenes/plane.png");
	playerImg2 = loadImage("Imágenes/plane2.png");
	enemyImg = loadImage("Imágenes/enemy.png");
}

function setup() {
	window = createCanvas(800,600);
	player = new Player((window.width/2)-40,window.height-100,velX,w,h);
}

function draw() {
	//background(125,205,255);
	background(0,0,0);

	//dificultad
	if(intervalo % 900 == 0){
		enemySpeed += 2;
	}

	for (var i = bullets.length - 1; i >= 0; i--) {
		bullets[i].show();
		bullets[i].update();
		for (var j = 0; j < enemies.length; j++) {
			if(bullets[i].collides(enemies[j])){
				bullets[i].disappear();
				enemies[j].disappear();
				player.score();
			}
		}
		if(bullets[i].y + bullets[i].h < 0){
			bullets[i].disappear();
		}
		if(bullets[i].delete == true){
			bullets.splice(i, 1);
		}
	}
	
	var star = new Star();
	stars.push(star);
	
	for (var i = stars.length - 1; i >= 0; i--){
		if(stars[i].y > canvas.height){
			stars[i].disappear();
		}
		if(stars[i].delete == true){
			stars.splice(i, 1);
		}
		stars[i].show();
		stars[i].update();
	}

	if(intervalo % 10 == 0){
		var enemy = new Enemy(enemySpeed);
		enemies.push(enemy);
	}

	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].show();
		enemies[i].update();
		if(player.collides(enemies[i]) == true){
			console.log("game over");
			gameOver = true;
		}
		if(enemies[i].y > canvas.height){
			enemies[i].disappear();
		}
		if(enemies[i].delete == true){
			enemies.splice(i, 1);
		}
	}
	if(intervalo % 5 == 0){
		player.changeImg();
	}
	player.show();
	player.move();
	
	//score
	updateScore();

	//instrucciones
	if(intervalo < 300){
		fill(255,255,255);
		textAlign(CENTER);
		textSize(20);
		text("Controles:\n A: mover izquierda \n D: mover derecha \n Espacio: disparar", canvas.width/2, 20);
	}

	if(player.x >= canvas.width - 100 || player.x <= 0){
		player.setDir(0);
	}

	if(gameOver == true){
		drawGameOver();
		noLoop();
	}

	intervalo++;
}

function drawGameOver(){
	fill(255,100,100);
	rect(canvas.width/3, canvas.height/2 - 50, 266, 120);
	fill(255,255,255);
	textAlign(CENTER);
	textSize(44);
	text("Has perdido!", canvas.width/2, canvas.height/2);
	textSize(16);
	text("Puntaje Obtenido: "+player.points+"\nTiempo sobrevivido: "+round(intervalo/60)+" seg", canvas.width/2, canvas.height/2 + 40);
}

function updateScore(){
	fill(255,255,255);
	rect(canvas.width - 120, 0, 120, 40);
	noStroke();
	fill(0,0,0);
	textAlign(LEFT);
	textSize(24);
	text("Puntaje: "+player.points, canvas.width - 120, 25);
}

function keyPressed(){
	switch(key){
		case 'd':
			if(player.x < canvas.width - 100){
				player.setDir(1);
			}
			break;
		case 'a':
			if(player.x > 0){
				player.setDir(-1);
			}
			break;
		case ' ':
			var shot = new Bullet(player.x + 50,player.y,bulletSpeed);
			bullets.push(shot);
	}
}

function keyReleased(){
	if(key == 'a' || key == 'd'){
		player.setDir(0);
	}
}
