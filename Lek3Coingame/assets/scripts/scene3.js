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
            //loading bar up
    //player
     this.load.spritesheet('player', 'assets/img/jet1.png', { frameWidth: 320, frameHeight: 320 });

     //tnt image
     this.load.image('tnt', 'assets/img/tnt.png');
     //nuke and explosion
     this.load.image('nuke', 'assets/img/nuke.png');
     this.load.image('bang', 'assets/img/explosion.png');
     this.load.audio('bangsound', 'assets/sound/explosion.mp3');
     //shelter
     this.load.image('shelter', 'assets/img/shelter.png'); 
     //tornado
     this.load.image('tornado', 'assets/img/tornado.png');

        //tilemap
        this.load.image ("tiles3", "map3.png");
        this.load.tilemapTiledJSON("map3","map3.json");
}

create() {
    //tilemap
    const map = this.make.tilemap({key: "map3"});
    const tileset = map.addTilesetImage("spritesheet","tiles3");
    const layer = map.createLayer('Tile Layer 1', tileset, -400,-1200);
    layer.setCollisionBetween (0, 100);

    // Add player sprite
    this.player = this.physics.add.sprite(150, 0, 'player');
    this.player.setScale(0.2); // Adjust scale as needed
    this.player.setGravityY(650);
    this.player.setBounce(0.1);
    this.physics.add.collider(this.player,layer);

    //nuke
    this.nuke = this.add.image(30, 50, 'nuke')
    this.nuke.setScale(2)
    this.nuke.setDepth(-2);
        // Create timer text
        this.timerText = this.add.text(40, -47, 'Time: 30', { font: '20px Arial', fill: '#FF0000' }).setOrigin(0.5);
        this.timerText.setScale (0.9);
        this.timerText.setDepth(-1);

        // Set up initial timer duration
        this.timerDuration = 30;

        // Set up timer event
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

    //shelter
    this.shelter = this.add.image (5400, 0, 'shelter');
    this.shelter.setScale(3);
    this.shelter.setDepth(-1);

    //tnt
    this.tnt = this.physics.add.sprite (2525, -170, "tnt");
    this.tnt.setScale(0.5);
    this.tnt.setImmovable(true);


    //tornado 1 & 2
    this.tornadol = this.physics.add.sprite (2100,0, "tornado");


    //camera
    this.cameras.main.setZoom (1);
    this.cameras.main.startFollow(this.player);

    // Set up cursors for player input
    this.cursors = this.input.keyboard.createCursorKeys();
}
//tnt collect function
collectTnt(player, tnt) {
    // Log debug message
    console.log("TNT collected");
    // Trigger true/false statement or additional logic
    this.tntCollected = true;
    // Destroy the TNT object
    tnt.destroy();
}

//nuke timer
updateTimer() {
    this.timerDuration--;

    // Update timer text
    this.timerText.setText(`Time: ${this.timerDuration}`);
    //nuke go bang
    if (this.timerDuration <= 0) {
        // Stop the timer
        this.timerEvent.remove(false);
        //exlopion image
        const explosion = this.add.image(this.nuke.x, this.nuke.y-600, 'bang').setScale(10).setDepth(4);
        //explosion sound
        const explosionSound = this.sound.add('bangsound', { volume: 0.5 });
        explosionSound.play();
        // Restart the scene after 30 seconds
        this.time.delayedCall(3000, () => {
            this.scene.restart();
        }, [], this);
    }
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
    const maxX = 5900;
    this.player.x = Phaser.Math.Clamp(this.player.x, minX, maxX);

    // Player jump
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-650);
    }
    //defines player's max velocity horizontal / vertical
    this.player.setMaxVelocity(600, 950);

    //nuke defuse
    const distanceX = Math.abs(this.player.x - this.nuke.x);
    if (this.tntCollected && distanceX < 100) {
        console.log("Player returned to nuke with TNT");

        // Stop the nuke timer
        this.timerEvent.remove(false);
        this.nukedefused = true;
        }

        //can player procceed to next level
        const distanceX2 = Math.abs(this.player.x - this.shelter.x);
        if (this.nukedefused && distanceX2 < 50) {
            console.log("Player can procceed");
            }
            
            // Check if the player can't proceed without defusing the bomb
        if (!this.nukedefused && distanceX2 < 50) {
        // Add text indicating that the player can't proceed without defusing the bomb
        if (!this.warningText) {
            this.warningText = this.add.text(this.player.x, this.player.y - 50, "You can't proceed without defusing the bomb", { font: '16px Arial', fill: '#ffffff' }).setOrigin(0.5);
            }
        } else 
        {
        // Remove warning text if exists
        if (this.warningText) {
            this.warningText.destroy();
            this.warningText = null;
            }
        }

        //tornado trigger
        const reverse1 = Math.abs(this.player.x - this.tornadol.x);

        if (reverse1 < 250&& this.player.y > -300) {
            this.player.setGravityY(-300);
            }
            else {
                this.player.setGravityY(650);
            }
    }
}