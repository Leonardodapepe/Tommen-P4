class Scene3 extends Phaser.Scene {

    constructor() {
        super({ key:'scene3'});
}
preload(){

     //player
     this.load.spritesheet('player', 'assets/img/jet1.png', { frameWidth: 320, frameHeight: 320 });

     //tnt image
     this.load.image('tnt', 'assets/img/tnt.png')

        //tilemap
        this.load.image ("tiles3", "map3.png");
        this.load.tilemapTiledJSON("map3","map3.json");
}

//map explodes in x time run for your life map

create() {
        //tilemap
    const map = this.make.tilemap({key: "map3"});
    const tileset = map.addTilesetImage("spritesheet","tiles3");
    const layer = map.createLayer('Tile Layer 1', tileset, 0,-1200);
    layer.setCollisionBetween (0, 100);



    // Add player sprite
    this.player = this.physics.add.sprite(150, 0, 'player');
    this.player.setScale(0.2); // Adjust scale as needed
    this.player.setGravityY(650);
    this.player.setBounce(0.1);
    this.physics.add.collider(this.player,layer);


    //camera
    this.cameras.main.setZoom (1);
    this.cameras.main.startFollow(this.player);


    // Set up cursors for player input
    this.cursors = this.input.keyboard.createCursorKeys();
    

}





update() {
// Player movement
if (this.cursors.left.isDown) {
    this.player.setVelocityX(-600);
} else if (this.cursors.right.isDown) {
    this.player.setVelocityX(600);
} else {
    this.player.setVelocityX(0);
}

// Constrain player's x position
const minX = 50;
const maxX = 6400;
this.player.x = Phaser.Math.Clamp(this.player.x, minX, maxX);

// Player jump
if (this.cursors.up.isDown && this.player.body.onFloor()) {
    this.player.setVelocityY(-650);
}
//defines player's max velocity horizontal / vertical
this.player.setMaxVelocity(600, 950);
}

}