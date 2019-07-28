var player;
var stars = [];
var enemies = [];
var bullets = [];
var powerUp = [];
var enemySpeed = 6;
var enemyLife = 1;
var bulletSpeed = 10;
var bulletType = 0;
var w = 40;
var h = 40;
var velX = 10;
var intervalo = 0;
var gameOver = false;
var gameStart = false;

//imagenes
var playerImg;
var playerImg2;
var enemyImg;
var enemyImg2;
var bulletImg;
var bulletImg2;
var powerUpImg;

function preload(){
	playerImg = loadImage("Imágenes/plane.png");
	playerImg2 = loadImage("Imágenes/plane2.png");
	enemyImg = loadImage("Imágenes/enemy.png");
	enemyImg2 = loadImage("Imágenes/enemy2.png");
	bulletImg = loadImage("Imágenes/bullet.png");
	bulletImg2 = loadImage("Imágenes/bullet2.png");
	powerUpImg = loadImage("Imágenes/powerup.png");
}

function setup() {
	window = createCanvas(960,720);
	player = new Player((window.width/2)-40,window.height-100,velX,w,h,playerImg);
	noLoop();
}

function draw() {
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
	if(intervalo % 8 == 0){
		if(intervalo > 1800){
			if(random() < 0.3){
				enemyLife = 2;
				var enemy = new Enemy(enemySpeed, enemyLife, enemyImg2);
			}else{
				enemyLife = 1;
				var enemy = new Enemy(enemySpeed, enemyLife, enemyImg);
			}
		}else{
			enemyLife = 1;
			var enemy = new Enemy(enemySpeed, enemyLife, enemyImg);
		}
		enemies.push(enemy);
	}

	//seguimiento de enemigos
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].show();
		enemies[i].update();
		if(player.collides(enemies[i]) == true){
			gameOver = true;
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

	player.show();
	player.move();
	
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
		drawGameOver();
		noLoop();
	}

	//inicio del juego
	if(intervalo == 0){
		drawStartGame();
	}

	//variable para obtener tiempos en el juego (intervalo = segundo * 60)
	intervalo++;

	//dificultad
	if(intervalo % 1200 == 0){
		enemySpeed += 2;
	}
}

function drawStartGame(){
	textAlign(CENTER);
	textSize(36);
	text("Presiona espacio para comenzar", canvas.width/2, canvas.height/2);
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
	rect(canvas.width/3, canvas.height/2 - 50, canvas.width/3, canvas.height/5);
	fill(255,255,255);
	stroke(0,0,0);
	textAlign(CENTER);
	textSize(44);
	text("Has perdido!", canvas.width/2, canvas.height/2);
	noStroke();
	textSize(20);
	text("Puntaje Obtenido: "+player.points+"\nTiempo sobrevivido: "+round(intervalo/60)+" seg", canvas.width/2, canvas.height/2 + 40);
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


function keyReleased(){
	if(key == 'a' || key == 'd'){
		player.setDir(0);
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
			if(gameStart == false){
				gameStart = true;
				loop();
			}else{
				if(bulletType == 0){
					var shot = new Bullet(player.x + 50,player.y,5,40,bulletSpeed,1,bulletImg);
				}else{
					var shot = new Bullet(player.x + 50,player.y,15,60,bulletSpeed,2,bulletImg2);
				}
				bullets.push(shot);
			}
	}
}

