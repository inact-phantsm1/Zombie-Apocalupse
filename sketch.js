const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var bg, helicopterImg, helicopter, parcelImg, parcel, box, houseImg, house, railImg, rail;
var drop, bgsound;

function preload() {
    bg = loadImage("bg.jpg");
    helicopterImg = loadImage("helicopter.png");
    parcelImg = loadImage("parcel.png");
    houseImg = loadImage("House.png");
    railImg = loadImage("rail.png");
    drop = loadSound("drop.mp3");
    bgsound = loadSound("bg.mp3");
}

function setup() {
    createCanvas(900, 600);

    bgsound.play();

    engine = Engine.create();
    world = engine.world;

    box = Bodies.rectangle(580, 180, 20, 20, {
        restitution: 1,
        isStatic: true
    });
    World.add(world, box);
    ground = new Static(width / 2, height - 10, width, 50);
    
    house = createSprite(600, 370);
    house.addImage("houseImg", houseImg);

    parcel = createSprite(box.position.x, box.position.y);
    parcel.addImage("parcelImg", parcelImg);
    parcel.scale = 0.8;

    rail = createSprite(580,390);
    rail.addImage("railImg",railImg);

    helicopter = createSprite(500, 125);
    helicopter.addImage("helicopterImg", helicopterImg);

    railBody = new Static(580,430,200,20);

    Engine.run(engine);
}

function keyPressed() {
    if (keyCode == DOWN_ARROW) {
        drop.play();
        Matter.Body.setStatic(box, false);
    }
}

function draw() {
    background(bg);
    parcel.x = box.position.x;
    parcel.y = box.position.y - 33;
    Engine.update(engine);
    ground.show();
    if (parcel.y >= 376)
        drop.stop();
    drawSprites();
}