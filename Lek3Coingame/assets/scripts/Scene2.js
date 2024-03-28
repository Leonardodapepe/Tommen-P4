

var plane;
class Scene2 extends Phaser.Scene {

    constructor() {
        super({ key:'scene2'});
}

    preload() {
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

        //tilemap
        this.load.tilemapTiledJSON('map2', 'map2.json');
        //tilemap img
        this.load.image('tiles2', 'map2.png');

        //player
        this.load.spritesheet('player', 'assets/img/egg.png', { frameWidth: 320, frameHeight: 320 });

        //jet images
        this.load.image('plane', 'assets/img/jet1.png');
        this.load.image('plane2', 'assets/img/jet1t.png');
    }

    create() {

        //tilemap
        const map = this.make.tilemap({key:'map2'});
        const tileset = map.addTilesetImage('spritesheet','tiles2');
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


        //random jet generator
        //decide where plane spawns
        function createplane(scene) {
            let xCoord = Phaser.Math.Between(0, 100);
            let yCoord = Phaser.Math.Between(5850, 5890);
            let plane = scene.physics.add.image(xCoord, yCoord, "plane2");
            plane.setScale(1.5);
            plane.setVelocityX(400);
            
            // Destroy the plane after 7.5 seconds
            scene.time.delayedCall(7500, function() {
                plane.destroy();
            }, [], scene);
        }
            //restarts scene if player hiits plane
            this.physics.add.collider(this.player,this.plane,  () => {
                this.scene.restart();
            });

        // Define a function to create a plane at random intervals
        function createplaneAtRandomIntervals(scene) {
            let interval = Phaser.Math.Between(3500, 6000); // Random interval between 3 to 5 seconds
            scene.time.addEvent({
                delay: interval,
                callback: function () {
                    createplane(scene);
                    
                    // Call this function recursively to create plane at another random interval
                    createplaneAtRandomIntervals(scene);
                },
                loop: false
            });
        }
        createplaneAtRandomIntervals(this);
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
        this.player.setMaxVelocity(600, 950)    


         // Constrain player's x position
         const minX = 0;
         const maxX = 3150;
         this.player.x = Phaser.Math.Clamp(this.player.x, minX, maxX);
    }

}