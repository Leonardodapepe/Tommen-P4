class Game extends Phaser.Scene {

constructor(){
    super({key: 'Gamescene'})
}


    preload() {
        this.load.image('background', 'assets/img/background.png');
        this.load.spritesheet('coin', 'assets/img/coin_spritesheet.png', { frameWidth: 320, frameHeight: 320 });
        this.load.spritesheet('player', 'assets/img/egg.png', { frameWidth: 320, frameHeight: 320 });

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
    }

    create() {
        this.singleImage = this.add.image(window.innerWidth / 2, 210, 'background');
        this.singleImage.setScale(5, 2.5);

        // Create an array to store coin sprites
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 9, // Number of coins to create
            setXY: { x: 20, y: 200, stepX: 140 } // Position of the first coin and the distance between coins
        });

        // Set properties for each coin
        this.coins.children.iterate(function (coin) {
            coin.setScale(0.15); // Adjust scale as needed
            coin.setGravityY(500);
            coin.setCollideWorldBounds(true);
            coin.setBounce(0.6);

            // Define coin animation for each coin
            coin.anims.create({
                key: 'coinframes',
                frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 4 }), // Adjust frame range based on your spritesheet
                frameRate: 3, // Adjust frame rate as needed
                repeat: -1 // Loop indefinitely
            });

            // Play coin animation for each coin
            coin.play('coinframes');
        }, this);

        // Add player sprite
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5); // Adjust scale as needed
        this.player.setGravityY(100);
        this.player.setBounce(0.1);

        // Define player animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }), // Adjust frame range based on your spritesheet
            frameRate: 10,
            repeat: -1
        });

        // Initialize score
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // Set up collision between player and coins
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        // Set up cursors for player input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        // Player jump
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-200);
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true); // Remove the coin from the screen
        this.score += 10; // Increase score by 10 for each coin collected
        this.scoreText.setText('Score: ' + this.score); // Update score text
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 20,
    height: window.innerHeight - 20,
    backgroundColor: '#4488aa',
    parent: 'phaser-example',
    scene: [Menu,Game],
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    }
};

const game = new Phaser.Game(config);
