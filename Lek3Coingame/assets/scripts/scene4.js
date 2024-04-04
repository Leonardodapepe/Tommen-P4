class Scene4 extends Phaser.Scene {

    constructor() {
        super({ key:'scene4'});
}
    preload(){
        //player
        this.load.spritesheet('player', 'assets/img/egg.png', { frameWidth: 320, frameHeight: 320 });
    }


    create(){
         // Add player sprite
         this.player = this.physics.add.sprite(0, 0, 'player');
         this.player.setScale(0.2); // Adjust scale as needed
         this.player.setGravityY(650);
         this.player.setBounce(0.1);
        // this.physics.add.collider(this.player,layer);
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