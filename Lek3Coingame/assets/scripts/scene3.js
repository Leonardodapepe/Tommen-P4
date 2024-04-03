class Scene3 extends Phaser.Scene {

    constructor() {
        super({ key:'scene3'});
}
preload(){

            //Loading screen
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(width/2-160,height/2-30,320,50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#8c8c8c8'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#8c8c8c8'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            percentText.setDepth(1);
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#8c8c8c8'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(width/2-147.5,height/2-30,320*value,50);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
                console.log("complete");
            });

     //player
     this.load.spritesheet('player', 'assets/img/jet1.png', { frameWidth: 320, frameHeight: 320 });

     //tnt image
     this.load.image('tnt', 'assets/img/tnt.png')
     //nuke and explosion
     this.load.image('nuke', 'assets/img/nuke.png')
     this.load.image('bang', 'assets/img/explosion.png')

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

    //tnt
    this.tnt = this.add.sprite (2925, -170, "tnt");
    this.tnt.setScale(0.5);

    //camera
    this.cameras.main.setZoom (1);
    this.cameras.main.startFollow(this.player);


    // Set up cursors for player input
    this.cursors = this.input.keyboard.createCursorKeys();
    
        // Set up collision between player and tnt
        this.physics.add.overlap(this.player, this.tnt, this.collectTnt, null, this, console.log("debug"));
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

collectTnt(player, tnt) {
    tnt.disableBody(true, true); // Remove the coin from the screen
    this.score += 10; // Increase score by 10 for each coin collected
    this.scoreText.setText('Score: ' + this.score); // Update score text
    console.log("debug");
}

}