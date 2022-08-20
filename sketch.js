//Resolución del juego
//(800x600),(864,648),(960x720),(1024,768)
var screenWidth = 1280;
var screenHeight = 720;

//variables globales
var player;
var stars = [];
var enemies = [];
var bullets = [];
var powerUp = [];
var enemySpeed;
var enemyFreq;
var enemyLife = 1;
var enemyDamage;
var bulletSpeed = 10;
var bulletType;
var bulletDamage;
var prevBullet;
var ulti;
var w = 40;
var h = 40;
var zoom = 1;
var velX = 10;
var intervalo;
var damaged;
var gameOver;
var gameStart = false;
var boton1;
var auxPlayerDmg;
var auxUlti;
var aux;
var playerHealth;
var healthPercentage;

//imagenes
var playerImg;
var playerImg2;
var enemyImg;
var enemyImg2;
var enemyImg3;
var bulletImg;
var bulletImg2;
var ultiImg;
var ultiImg2;
var ultiImg3;
var powerUpImg;
var powerUpImg2;
var healthImg;

function preload(){
	playerImg = loadImage("Imágenes/plane.png");
	playerImg2 = loadImage("Imágenes/plane2.png");
	enemyImg = loadImage("Imágenes/enemy.png");
	enemyImg2 = loadImage("Imágenes/enemy2.png");
	enemyImg3 = loadImage("Imágenes/enemy3.png");
	bulletImg = loadImage("Imágenes/bullet.png");
	bulletImg2 = loadImage("Imágenes/bullet2.png");
	ultiImg = loadImage("Imágenes/ulti.png");
	ultiImg2 = loadImage("Imágenes/ulti2.png");
	ultiImg3 = loadImage("Imágenes/ulti3.png");
	powerUpImg = loadImage("Imágenes/powerup.png");
	powerUpImg2 = loadImage("Imágenes/powerup2.png");
	healthImg = loadImage("Imágenes/health.png");
}

function setup() {
	window = createCanvas(screenWidth,screenHeight); 
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
	rect(canvas.width/19,canvas.height/72,canvas.width * 8/35,canvas.height/18);

	if(healthPercentage > 0){
		if(healthPercentage > 50){
			fill(0,255,0);
		}else if(healthPercentage > 20){
			fill(255,255,0);
		}else{
			fill(255,0,0);
		}

		noStroke();
		rect(canvas.width/16,canvas.height/36,(healthPercentage*2)*canvas.width/960,canvas.height/36);
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

function drawScore(){
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

	//creacion de enemigos
	if(intervalo % (10 - enemyFreq) == 0){
		if(intervalo > 3600){
			var prob = random();
			if(prob > 0.7){
				enemyLife = 2;
				enemyDamage = 50;
				var enemy = new Enemy(55,55,enemySpeed, enemyLife, enemyDamage, enemyImg2);
			}else if(prob < 0.15){
				enemyLife = 3;
				enemyDamage = 70;
				var enemy = new Enemy(80,50,enemySpeed, enemyLife, enemyDamage, enemyImg3);
			}else{
				enemyLife = 1;
				enemyDamage = 30;
				var enemy = new Enemy(55,40,enemySpeed, enemyLife, enemyDamage, enemyImg);
			}
		}else if(intervalo > 1800){
			if(random() > 0.7){
				enemyLife = 2;
				enemyDamage = 50;
				var enemy = new Enemy(55,40,enemySpeed, enemyLife, enemyDamage, enemyImg2);
			}else{
				enemyLife = 1;
				enemyDamage = 30;
				var enemy = new Enemy(55,40,enemySpeed, enemyLife, enemyDamage, enemyImg);
			}
		}else{
			enemyLife = 1;
			enemyDamage = 30;
			var enemy = new Enemy(55,40,enemySpeed, enemyLife, enemyDamage, enemyImg);
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

	//seguimiento de disparos
	for (var i = 0; i < bullets.length; i++) {
		if(bulletType == 2 && bullets[i].damage == 5){
			if(auxUlti == null){
				auxUlti = intervalo + 180;
			}

			if(intervalo > auxUlti){
				bulletType = prevBullet;
				bullets[i].disappear();
				ulti = false;
				auxUlti = null;
			}

			if(intervalo % 5 == 0){
				bullets[i].changeImg();
			}

			bullets[i].x = player.x;
			bullets[i].showUlti();
		}else{
			bullets[i].show();
			bullets[i].update();
		}
		for (var j = 0; j < enemies.length; j++) {
			if(bullets[i].collides(enemies[j])){
				if(bulletType != 2){
					bullets[i].disappear();
				}

				enemies[j].life -= bullets[i].damage;

				if(enemies[j].life < 1){
					enemies[j].disappear();
					player.score(enemies[j]);

					if(intervalo > 2400 && random() < 0.03){
						var pwUp = new PowerUp(enemies[j].x,enemies[j].y,40,40,5.5,0,powerUpImg);
						powerUp.push(pwUp);
					}

					if(intervalo > 2400 && random() < 0.01){
						var pwUp = new PowerUp(enemies[j].x,enemies[j].y,30,30,6,1,powerUpImg2);
						powerUp.push(pwUp);
					}
				}
			}
		}

		if(bullets[i].y + bullets[i].h < 0 && bulletType != 2){
			bullets[i].disappear();
		}

		if(bullets[i].delete == true){
			bullets.splice(i, 1);
		}
	}

	//seguimiento de power ups
	for (var i = powerUp.length - 1; i >= 0; i--) {
		//efecto de zoom
		if(powerUp[i].type == 1){
			if(powerUp[i].aux == null){
				powerUp[i].zoomP += 0.05;
				if(powerUp[i].zoomP >= 1.5){
					powerUp[i].aux = 1;
				}
			}else{
				powerUp[i].zoomP -= 0.05;
				if(powerUp[i].zoomP <= 1){
					powerUp[i].aux = null;
				}
			}
		}

		powerUp[i].show();
		powerUp[i].update();

		if(bulletType != 2){
			if(player.collides(powerUp[i]) == true){
				if(powerUp[i].type == 0){
					bulletType = 1;
				}else{
					prevBullet = bulletType;
					bulletType = 2;
				}
				powerUp[i].disappear();
			}
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
			auxPlayerDmg = intervalo + 60;
		}

		if(intervalo < auxPlayerDmg){
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
	drawScore();

	//instrucciones
	if(intervalo < 300){
		drawInstructions();
	}

	//restricciones de movimiento del jugador
	if(player.x + 40 >= canvas.width || player.x - 40 <= 0){
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
	if(intervalo % 1200 == 0 && intervalo <= 3600){
		enemySpeed += 2;
	}

	if(intervalo > 3600){
		if(intervalo % 900 == 0){
			if(enemyFreq < 9){
				enemyFreq++;
			}
		}
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
	player = new Player((window.width/2),window.height-100,velX,w,h,playerHealth,playerImg);
	enemies.splice(0,enemies.length);
	bullets.splice(0,bullets.length);
	powerUp.splice(0,powerUp.length);
	bulletType = 0;
	prevBullet = 0;
	ulti = false;
	enemySpeed = 6;
	enemyFreq = 1; //enemigos que aparecen por segundo
	intervalo = 0;
	damaged = false;
	gameOver = false;
	aux = null;
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
					bulletDamage = 1;
					var shot = new Bullet(player.x,player.y,5,40,bulletSpeed,bulletDamage,bulletImg);
					break;
				case 1:
					bulletDamage = 2;
					var shot = new Bullet(player.x,player.y,15,60,bulletSpeed,bulletDamage,bulletImg2);
					break;
				case 2:
					if(ulti == false){
						var bandera = 1;
						bulletDamage = 5;
						var shot = new Bullet(player.x,-780,100,canvas.height * 49/50,0,bulletDamage,ultiImg2);
						ulti = true;
					}else{
						bandera = 0;
					}
					break;
			}
			if(bulletType != 2 || bandera == 1){
				bullets.push(shot);
			}
			break;

		case 'r':
			if(gameStart == false){
				changeGameState();
				resetGame();
			}
	}
}
