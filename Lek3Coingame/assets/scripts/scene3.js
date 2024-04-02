class Scene3 extends Phaser.Scene {

    constructor() {
        super({ key:'scene3'});
}
preload(){
        //tilemap
        this.load.tilemapTiledJSON('map3', 'map3.json');
        //tilemap img
        this.load.image('tiles3', 'map3.png');

         //player
         this.load.spritesheet('player', 'assets/img/jet1.png', { frameWidth: 320, frameHeight: 320 });
}
//map explodes in x time run for your life map
create() {
    //tilemap
    const map = this.make.tilemap({key:'map3'});
    const tileset = map.addTilesetImage('map3','tiles3');
    const layer = map.createLayer('Tile Layer 1', tileset, 0,-350);
    layer.setCollisionBetween (0, 100);

    // Add player sprite
    this.player = this.physics.add.sprite(2534/2, 5890, 'player');
    this.player.setScale(0.2); // Adjust scale as needed
    this.player.setGravityY(650);
    this.player.setBounce(0.1);
    this.physics.add.collider(this.player,layer);


    //camera
    this.cameras.main.setZoom (1);
    this.cameras.main.startFollow(this.player);


    // Set up cursors for player input
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log("scene3 fucking fungerar");
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

// Player jump
if (this.cursors.up.isDown && this.player.body.onFloor()) {
    this.player.setVelocityY(-950);
}
//defines player's max velocity horizontal / vertical
this.player.setMaxVelocity(600, 950);
}

}