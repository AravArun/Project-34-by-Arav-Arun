//Create variables here
var dog, happyDog, database, foodS, foodStock,dogImg, dogImg1;
function preload()
{
  //load images here
  dogImg = loadImage("dog.png")
  dogImg1 = loadImage("dog1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.scale=0.15;
  dog.addImage(dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87)
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg1)
  }
  drawSprites();
  //add styles here
  textSize(30);
  fill(0);
  text("Food remaining:"+foodS,50,50)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x - 1
  }
  database.ref('/').update({Food:x})
}



