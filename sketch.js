var player;
var stars = [];
var enemies = [];
var bullets = [];
var powerUp = [];
var enemySpeed;
var enemyLife = 1;
var enemyDamage;
var bulletSpeed = 10;
var bulletType;
var w = 40;
var h = 40;
var velX = 10;
var intervalo;
var damaged;
var gameOver;
var gameStart = false;
var boton1;
var auxPlayerDmg;
var playerHealth;
var healthPercentage;

//imagenes
var playerImg;
var playerImg2;
var enemyImg;
var enemyImg2;
var bulletImg;
var bulletImg2;
var powerUpImg;
var healthImg;

function preload(){
	playerImg = loadImage("Imágenes/plane.png");
	playerImg2 = loadImage("Imágenes/plane2.png");
	enemyImg = loadImage("Imágenes/enemy.png");
	enemyImg2 = loadImage("Imágenes/enemy2.png");
	bulletImg = loadImage("Imágenes/bullet.png");
	bulletImg2 = loadImage("Imágenes/bullet2.png");
	powerUpImg = loadImage("Imágenes/powerup.png");
	healthImg = loadImage("Imágenes/health.png");
}

function setup() {
	window = createCanvas(960,720);
	resetGame();
}

function draw() {
	if(gameStart == false){
		drawBackGroundMenu();
		drawMenu();
	}else{
		boton1.remove();
		drawGame();
	}
}

function drawHealth(){
	image(healthImg,0,0);
	strokeWeight(6);
	stroke(255,255,255);
	fill(0,0,0,155);
	rect(canvas.width/19,canvas.height/72,canvas.width * 8/35,40);
	if(healthPercentage > 0){
		if(healthPercentage > 50){
			fill(0,255,0);
		}else if(healthPercentage > 20){
			fill(255,255,0);
		}else{
			fill(255,0,0);
		}
		noStroke();
		rect(canvas.width/16,canvas.height/36,healthPercentage*2,canvas.height/36);
	}
}

function drawMenu(){
	strokeWeight(8);
	stroke(50,155,255,200);
	fill(255,0,0,200);
	rect(canvas.width/3, canvas.height/3, canvas.width/3, canvas.height/4);
	if(boton1 == null){
		boton1 = createButton("Empezar");
		boton1.position(canvas.width * 7/16,canvas.height * 7/17);
		boton1.size(canvas.width/8, canvas.height/20);
	}
	boton1.mouseClicked(changeGameState);
}

function changeGameState(){
	if(gameStart == false){
		gameStart = true;
	}else{
		gameStart = false;
	}
}

function drawInstructions(){
	fill(255,255,255);
	textAlign(CENTER);
	textSize(20);
	text("Controles:\n A: mover izquierda \n D: mover derecha \n Espacio: disparar", canvas.width/2, 20);
}

function drawGameOver(){
	fill(255,100,100);
	strokeWeight(8);
	stroke(255,50,50);
	rect(canvas.width/3, canvas.height * 31/72, canvas.width/3, canvas.height * 7/25);
	fill(255,255,255);
	stroke(0,0,0);
	textAlign(CENTER);
	textSize(44);
	text("Has perdido!", canvas.width/2, canvas.height/2);
	noStroke();
	textSize(20);
	text("Puntaje Obtenido: "+player.points+"\nTiempo sobrevivido: "+round(intervalo/60)+" seg", canvas.width/2, canvas.height * 17/30);
	strokeWeight(2);
	stroke(0,0,0);
	textSize(16);
	text("Presiona R para\ncomenzar de nuevo", canvas.width/2, canvas.height * 2/3);
}

function updateScore(){
	fill(255,255,255);
	rect(canvas.width * (5/6), 0, canvas.width/6, canvas.height/15);
	noStroke();
	fill(0,0,0);
	textAlign(LEFT);
	textSize(24);
	text("Puntaje: "+player.points, canvas.width * (5/6), canvas.height/24);
}

function drawGame(){
	//mapa de fondo
	background(0,0,0);

	//estrellas
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

	//seguimiento de disparos
	for (var i = bullets.length - 1; i >= 0; i--) {
		bullets[i].show();
		bullets[i].update();
		for (var j = 0; j < enemies.length; j++) {
			if(bullets[i].collides(enemies[j])){
				bullets[i].disappear();
				enemies[j].life -= bullets[i].damage;
				if(enemies[j].life < 1){
					enemies[j].disappear();
					player.score(enemies[j]);
					if(intervalo > 2400 && random() < 0.03){
						var pwUp = new PowerUp(enemies[j].x,enemies[j].y,40,40,5.5,powerUpImg);;
						powerUp.push(pwUp);
					}
				}
			}
		}
		if(bullets[i].y + bullets[i].h < 0){
			bullets[i].disappear();
		}
		if(bullets[i].delete == true){
			bullets.splice(i, 1);
		}
	}

	//creacion de enemigos
	if(intervalo % 9 == 0){
		if(intervalo > 1800){
			if(random() < 0.3){
				enemyLife = 2;
				enemyDamage = 60;
				var enemy = new Enemy(enemySpeed, enemyLife, 60, enemyImg2);
			}else{
				enemyLife = 1;
				enemyDamage = 40;
				var enemy = new Enemy(enemySpeed, enemyLife, 40, enemyImg);
			}
		}else{
			enemyLife = 1;
			enemyDamage = 40;
			var enemy = new Enemy(enemySpeed, enemyLife, 40, enemyImg);
		}
		enemies.push(enemy);
	}

	//seguimiento de enemigos
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].show();
		enemies[i].update();
		if(player.collides(enemies[i]) == true){
			healthPercentage -= (enemies[i].damage/playerHealth) * 100;
			player.health -= enemies[i].damage;
			if(player.health < 1){
				gameOver = true;
			}else{
				damaged = true;
			}
			enemies[i].disappear();
		}
		if(enemies[i].y > canvas.height){
			enemies[i].disappear();
		}
		if(enemies[i].delete == true){
			enemies.splice(i, 1);
		}
	}

	//seguimiento de power ups
	for (var i = powerUp.length - 1; i >= 0; i--) {
		powerUp[i].show();
		powerUp[i].update();
		if(player.collides(powerUp[i]) == true){
			bulletType = 1;
			powerUp[i].disappear();
		}
		if(powerUp[i].y > canvas.height){
			powerUp[i].disappear();
		}
		if(powerUp[i].delete == true){
			powerUp.splice(i, 1);
		}
	}

	//seguimiento de jugador
	if(intervalo % 5 == 0){
		player.changeImg();
	}

	if(damaged == false){
		player.show();
	}else{
		if(auxPlayerDmg == null){
			auxPlayerDmg = intervalo;
		}

		if(intervalo < auxPlayerDmg + 60){
			if(intervalo % 8 == 0){
				player.getHurt();
			}
		}else{
			damaged = false;
			auxPlayerDmg = null;
		}
	}

	player.move();
	drawHealth();
	
	//puntaje
	updateScore();

	//instrucciones
	if(intervalo < 300){
		drawInstructions();
	}

	//restricciones de movimiento del jugador
	if(player.x >= canvas.width - 100 || player.x <= 0){
		player.setDir(0);
	}

	//fin del juego
	if(gameOver == true){
		gameStart = false;
		drawGameOver();
		noLoop();
	}

	//variable para obtener tiempos en el juego (intervalo = segundo * 60)
	intervalo++;

	//dificultad incremental
	if(intervalo % 1200 == 0){
		enemySpeed += 2;
	}
}

function drawBackGroundMenu(){
	//mapa de fondo
	background(0,0,0);

	//estrellas
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
}

function resetGame(){
	playerHealth = 100;
	player = new Player((window.width/2)-40,window.height-100,velX,w,h,playerHealth,playerImg);
	enemies.splice(0,enemies.length);
	bullets.splice(0,bullets.length);
	powerUp.splice(0,powerUp.length);
	bulletType = 0;
	enemySpeed = 6;
	intervalo = 0;
	damaged = false;
	gameOver = false;
	healthPercentage = 100;
	loop();
}

function keyReleased(){
	if(!keyIsDown(65) && !keyIsDown(68)){
		if(key == 'a' || key == 'd'){
			player.setDir(0);
		}
	}
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
			switch(bulletType){
				case 0: 
					var shot = new Bullet(player.x + 50,player.y,5,40,bulletSpeed,1,bulletImg);
					break;
				case 1:
					var shot = new Bullet(player.x + 50,player.y,15,60,bulletSpeed,2,bulletImg2);
					break;
			}
			bullets.push(shot);
			break;

		case 'r':
			if(gameStart == false){
				changeGameState();
				resetGame();
			}
	}
}

