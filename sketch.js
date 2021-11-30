var bg,bgImg1,bgImg2,bgImg3;
var queen,queenImg;
var seahorse,seahse1,seahse2,seahse3,octo,octoImg,sword,swordImg;
var diamond,ddImg,gem,gemImg,jwel,jwelImg ;
var edges , rewGroup , obsGroup ;
var score = 0 ;
var life , life1 , life2 , life3 ;
var obsCollisionCounter = 0

function preload(){
 bgImg3 = loadImage("/assets/sea1.jpg");

 queenImg = loadImage("/assets/seaquen.png");

 seahse1 = loadImage("/assets/seaHorse.png");
 octoImg = loadImage("/assets/evilOcto.png");
 swordImg = loadImage("/assets/sword.png");

 ddImg = loadImage("/assets/diamonds.png");
 gemImg = loadImage("/assets/gem.png");
 jwelImg = loadImage("/assets/jwell.png");

 /*life1 = loadAnimation("/assets/heart_1.png");
 life2 = loadAnimation("/assets/heart_2.png");
 life3 = loadAnimation("/assets/heart_3.png");*/

 heart1Img = loadImage("assets/heart_1.png")
 heart2Img = loadImage("assets/heart_2.png")
 heart3Img = loadImage("assets/heart_3.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(width/2,height/2,width,height);
  bg.addImage('sea',bgImg3);
  bg.scale = 2.5;
  bg.velocityX = -3;

  queen = createSprite(width-1454,height/2);
  queen.addImage('princess',queenImg);
  queen.scale = 0.45;

  obsGroup = new Group();
  rewGroup = new Group();

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4

  /*life = createSprite(300,90);
  life.addAnimation("1",life1);
  life.addAnimation("2",life2);
  life.addAnimation("3",life3);
  life.changeAnimation("3",life3);

  life.scale = 0.47;*/
  

  edges = createEdgeSprites();
  


}

function draw() {
  background(0); 

 if(bg.x < 720){
    bg.x = width/2
 };

 if(keyDown(UP_ARROW)){
    queen.y = queen.y-6
 }

 if(keyDown(DOWN_ARROW)){
   queen.y += 6
 }

 spawnObstacle();
 spawnReward ();

  for(var i=0; i<rewGroup.length; i++){
    if(rewGroup[i].collide(queen)){
      score += 10
      rewGroup[i].destroy();
    };
  }

  for(var i=0;i<obsGroup.length;i++){
  if(obsGroup[i].collide(queen)){
    obsCollisionCounter++
    obsGroup[i].destroy();
  }  
}


 if(obsCollisionCounter===3){
  heart1.visible = false
  heart2.visible = true
  heart3.visible = false
 }

 if(obsCollisionCounter===6){
  heart3.visible = false
  heart1.visible = true
  heart2.visible = false
 }

 if(obsCollisionCounter===9){
  heart3.visible = false
  heart1.visible = false
  heart2.visible = false

  gameOver()
 }

 queen.bounceOff(edges);


  drawSprites();

textSize(40);
fill("white");
text("Treasure : " + score , width-350 , 100);

text(obsCollisionCounter,120,50)

}

function spawnObstacle (){
  
  if(frameCount%217 === 0){
    var obs = createSprite(width,random(height-100,height-100))
    obs.velocityX = -10 ;

    obs.lifetime = width/10;
    obsGroup.add(obs);
    
    rand = Math.round(random(1,3));
    switch(rand){
      case 1 : obs.addImage(seahse1);
      obs.scale = 0.59
        break
      case 2 : obs.addImage(octoImg);
      obs.scale = 0.35
        break
      case 3 : obs.addImage(swordImg);
      obs.scale = 0.28
        break
      default: break
    }
  }
}

function spawnReward (){

  if(frameCount%10 === 0){
    var rew = createSprite(width,random(50,height-100))
    rew.velocityX = -10 ;

    rew.lifetime = width/10;
    rewGroup.add(rew);

    rando = Math.round(random(1,3));
    switch(rando){
      case 1 : rew.addImage(ddImg);
      rew.scale = 0.09
        break
      case 2 : rew.addImage(gemImg);
      rew.scale = 0.35
        break
      case 3 : rew.addImage(jwelImg);
      rew.scale = 0.28
        break
      default: break
    }
  }
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm){
    location.reload();
  }
  );


  
}

