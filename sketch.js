var playerImg, bulletImg, galagaImg, heading, lose;
var gameState = 0;
var player, gameover, galaga, title, enemyImg, enemy;
var score = 0;
var playerhealth = 3;

function preload() {
  playerImg = loadImage("player.png");
  bulletImg = loadImage("bullet.png");
  galagaImg = loadImage("1.png");
  heading = loadImage("2.png");
  lose = loadImage("gameover.png");
  enemyImg = loadImage("enemy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  player = createSprite(width / 2, height - height / 6, 20, 20);
  player.addImage(playerImg);
  player.scale = 0.5;


  gameover = createSprite(width / 2, 200, 20, 20);
  gameover.addImage(lose);
  gameover.visible = false;

  galaga = createSprite(width / 2, 120, 20, 20);
  galaga.addImage(galagaImg);
  galaga.scale = 0.5;

  title = createSprite(width / 2, 250, 20, 20);
  title.addImage(heading);

  enemyGroup = createGroup();
  bulletGroup = createGroup();
  enemybullet = createGroup();
}

function draw() {
  background(0);

  // Starting
  if (gameState === 0) {
    player.visible = false;
    if (keyDown("ENTER")) {
      galaga.visible = false;
      title.visible = false;
      gameState = 1;
    }

  }

  // Play
  if (gameState === 1) {
    textSize(20);
    text("score: " + score, 320, 23);

    text("Health: " + playerhealth, 30, 23);

    player.visible = true;
    if (keyWentDown("space")) {
      bullets();
    }
    enemyfunc();
    if (player.x < width - 80 && player.x > 70) {
      if (keyDown(LEFT_ARROW)) {
        player.x = player.x - 10;
      }
      if (keyDown(RIGHT_ARROW)) {
        player.x = player.x + 10;
      }
    }
    else if (player.x < width - 80) {
      player.x = player.x + 20
    }
    else if (player.x > 70) {
      player.x = player.x - 20
    }

    // Concept
    for (var i = 0; i < enemyGroup.length; i++) {
      for (var j = 0; j < bulletGroup.length; j++) {
        for (let m = 0; m < enemybullet.length; m++) {
          if (enemyGroup.get(i).isTouching(bulletGroup.get(j))) {
            enemyGroup.get(i).destroy();
            bulletGroup.get(j).destroy();
            enemybullet.destroyEach();
            score = score + 1;
          }
        }
      }
    }
    for (var k = 0; k < enemyGroup.length; k++) {
      if (frameCount % 50 == 0) {
        shootbullet(enemyGroup.get(k));
      }
    }

    for (var l = 0; l < enemybullet.length; l++) {
      if (enemybullet.get(l).isTouching(player)) {
        playerhealth -= 1;
        enemybullet.get(l).destroy();
      }
    }
    if (playerhealth == 0) {
      gameState = 2;
    }

    if (gameState === 2) {
      player.visible = false;
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      enemybullet.destroyEach();
      gameover.visible = true;
    }
  }

  drawSprites();
}

function enemyfunc() {
  if (frameCount % 100 == 0) {
    var enemy = createSprite(random(50, 750), -20, 20, 20);
    enemy.addImage(enemyImg);
    enemy.scale = 0.5;
    enemy.velocityY = 3;
    enemy.lifetime = 200;
    enemyGroup.add(enemy);
  }
}

function bullets() {
  var bullet = createSprite(player.x, player.y - 20);
  bullet.addImage(bulletImg);
  bullet.setVelocity(0, -5);
  bulletGroup.add(bullet);
  bullet.lifetime = 200;
}

function shootbullet(enemy) {
  var bullets = createSprite(enemy.x, enemy.y, 10, 10);
  bullets.velocityY = 5;
  bullets.addImage(bulletImg);
  enemybullet.add(bullets);
}