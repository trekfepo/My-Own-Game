var playerShip,enemyShip;
var start,pause,gameOver;
var plasmaBall;
var blast;
var gameState = 1;
var enemyGroup;
var plasmaBallGroup;
var score = 0;
var life = 180;

function preload(){

  player_img = loadImage("./assets/playerShip.png")
  enemy_img = loadImage("./assets/enemyShip.png")
  space_img = loadImage("./assets/space.jpg")
  plasmaBalls_img = loadImage("./assets/plasmaBall.png")
  blast_img = loadAnimation("./assets/blast 1.png","./assets/blast 2.png","./assets/blast 3.png","./assets/blast 4.png","./assets/blast 5.png","./assets/blast 6.png","./assets/blast 7.png")
  life_img = loadImage("./assets/1.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  playerShip = createSprite(400, 660, 50, 50);
  playerShip.scale = 0.4;
  playerShip.addImage(player_img)
  // playerShip.debug = true
  
  life = createSprite(30,70,20,20)
  life.addImage(life_img)
  life.scale = 0.2

  enemyGroup = new Group()
  plasmaBallGroup = new Group()

}

function draw() {
  background(space_img);  
  console.log(life)

 if(gameState === 1){

    

    spawnEnemyShip();
    if(keyDown (RIGHT_ARROW)){
  
      playerShip.x = playerShip.x +20
    }
  
    if(keyDown (LEFT_ARROW)){
  
      playerShip.x = playerShip.x -20
    }

    if(keyWentDown("space")){

      spawnBullets();
      
    }
    if (enemyGroup.collide(playerShip)){

      handleGameOver(enemyGroup);
    }
    if(plasmaBallGroup.collide(enemyGroup)){

      handleCollision(plasmaBallGroup);
 }
 
	 
  drawSprites();
 }
 if(gameState === 2){

  console.log("GameOver......!!")
 }
  
fill("red")
rect(50,50,life,20)
fill("white")
rect(50,50,180,20)
console.log(life)
}
function spawnEnemyShip(){
if(frameCount%100==0){

  enemyShip = createSprite(random(50,width-100), 0, 50, 50);
  enemyShip.scale = 0.8;
  enemyShip.addImage(enemy_img)
  enemyShip.velocityY = 10
  enemyGroup.add(enemyShip)
  enemyShip.life = height+10
  // enemyShip.debug = true
}
}
function spawnBullets(){

  plasmaBall = createSprite(playerShip.x, playerShip.y, 50, 50);
  plasmaBall.addImage(plasmaBalls_img)
  plasmaBall.velocityY = -20;
  plasmaBall.scale = 0.5;
  plasmaBallGroup.add(plasmaBall)
}
function handleCollision(plasmaBallGroup){

  if(life>0){

    score = score+1
  }

  blast = createSprite(enemyShip.x, enemyShip.y, 50, 50);
  blast.scale = 1;
  blast.addAnimation("abcd",blast_img)
  blast.life = 18;

  enemyGroup.destroyEach()
  plasmaBallGroup.destroyEach()
  
}
function handleGameOver(enemyGroup){

  enemyGroup.destroyEach()

  life = life-60
  if(life = 0){

    gameState = 2;
    swal({
      title:'Oh Shit.......',
      text:'You died',
      text:'your killed'+ score,
      imageUrl:'https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png',
      imageSize:'100x100',
      confirmButtonText:'Thanx For Playing'
    })
  }
}