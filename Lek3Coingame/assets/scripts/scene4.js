class Scene4 extends Phaser.Scene {

    constructor() {
        super({ key:'scene4'});
}
    preload(){
        //player
        this.load.spritesheet('player', 'assets/img/egg.png', { frameWidth: 320, frameHeight: 320 });

        //acid
        this.load.image('acid', 'assets/gifs/acid.gif')

        //tilemap
        this.load.tilemapTiledJSON('map4', 'map4.json');
        //tilemap img
        this.load.image('tiles4', 'map4.png');

        //fish
        this.load.image('fish', 'assets/img/fish.png');
    }


    create(){

        //tilemap
        const map = this.make.tilemap({key:'map4'});
        const tileset = map.addTilesetImage('map4','tiles4');
        const layer = map.createLayer('Tile Layer 1', tileset, -750,-1650);
        layer.setCollisionBetween (0, 100);

        //acid
        this.acid = this.physics.add.image (2000,530, 'acid');
        this.acid.setDepth(-1);
        this.acid.setScale(1.74,1);

        //acid fish
        this.fish = this.physics.add.image (2000, 530, 'fish');

         // Add player sprite
         this.player = this.physics.add.sprite(0, 0, 'player');
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


    update(){
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
        this.player.setMaxVelocity(600, 950)    
    }


}