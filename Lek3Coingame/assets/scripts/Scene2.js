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
            console.log("complete lvl2");
        });


        //player
        this.load.spritesheet('player', 'assets/img/egg.png', { frameWidth: 320, frameHeight: 320 });
            //player jetpack
            this.load.image('jetpack', 'assets/img/jetpackoff.png');
            this.load.image('jetpackon','assets/img/jetpackon.png')

        //jet images
        this.load.image('plane', 'assets/img/jet1.png');
        this.load.image('plane2', 'assets/img/jet1t.png');

        //tilemap
        this.load.tilemapTiledJSON('map2', 'map2.json');
        //tilemap img
        this.load.image('tiles2', 'map2.png');
        //move
        this.load.image('move', 'assets/img/move.png');

        
    }

    moveright(){
        this.player.setVelocityX(600);
    }
    moveleft(){
        this.player.setVelocityX(-600);
    }
    moveup(){
        if(this.player.body.onFloor()){
        this.player.setVelocityY(-950);
    }
    }
    movestop(){
        this.player.setVelocityX(0);
    }
    movefly(){
        this.jetpackp.setTexture('jetpackon');
        this.player.setVelocityY(-800);
    }

    create() {

        //mobile controls
        if (IS_TOUCH){
            this.right = this.add.sprite(window.innerWidth * 1.35, window.innerHeight, 'move').setInteractive();
            this.right.setScrollFactor (0);
            this.right.setScale(0.33);
            this.right.setDepth(15);
            this.right.on("pointerdown", function(){
                this.moveright()
            },this).on("pointerup",function(){
                this.movestop()
            },this)
    
            this.left = this.add.image(window.innerWidth * 1.05, window.innerHeight, 'move').setInteractive();
            this.left.setScrollFactor (0);
            this.left.setScale(0.33);
            this.left.setDepth(15);    
            this.left.angle=180
            this.left.on("pointerdown", function(){
                this.moveleft()
            },this).on("pointerup",function(){
                this.movestop()
            },this)
    
            this.up = this.add.image(window.innerWidth * 1.20, window.innerHeight*0.6, 'move').setInteractive();
            this.up.setScrollFactor (0);
            this.up.setScale(0.33);
            this.up.setDepth(15);    
            this.up.angle=-90
            this.up.on("pointerdown", function(){
                if (this.jetpackCollected){
                    this.movefly()
                }else{
                    this.moveup()
                }
                
            },this).on ("pointerup",function(){
                this.jetpackp.setTexture('jetpack');
                this.movestop()
            },this)
        }

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
    if (IS_TOUCH){
        this.cameras.main.setZoom (0.5);
        this.cameras.main.startFollow(this.player);
    }
    else{
        this.cameras.main.setZoom (1);
        this.cameras.main.startFollow(this.player);
    }

        // Set up cursors for player input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //jetpack
        this.jetpack = this.physics.add.sprite (1069, 5890, "jetpack");
        this.physics.add.overlap(this.player, this.jetpack, this.collectJetpack, null, this);
        this.jetpack.setScale(0.25);
        this.jetpack.setImmovable(true);
        this.jetpackCollected = false;
        
        this.jetpackp = this.add.image(10000, this.player.y, 'jetpack').setScale(0.25).setDepth(-1);
        
        this.createPlaneAtRandomIntervals();
    }
    collectJetpack(player, jetpack) {
        // Log debug message
        console.log("jetpack collected");
        // Trigger true/false statement or additional logic
        this.jetpackCollected = true;
        // Destroy the jetpack object
        jetpack.destroy();
    }



    update() {
        if (!IS_TOUCH){
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

        //jetpack

        if (this.jetpackCollected && this.cursors.up.isDown){
            this.player.setVelocityY(-400);
            this.jetpackp.setTexture('jetpackon');
        }
        else {
            this.jetpackp.setTexture('jetpack');
        }
    }
        //jetpack model
        if (this.jetpackCollected){
            this.jetpackp.x = this.player.x -25;
            this.jetpackp.y = this.player.y +10;
            }
        
        //defines player's max velocity horizontal / vertical
        this.player.setMaxVelocity(600, 950)    


         // Constrain player's x position
         const minX = 0;
         const maxX = 3150;
         this.player.x = Phaser.Math.Clamp(this.player.x, minX, maxX);
        
         //nextlevel when reaching right altitude
         if (this.player.y <= 500){ //change to 500
                this.scene.start('scene3');
            }
        }


        //random jet generator
        //decide where plane spawns
        createPlane() {
            if (this.scene.isActive('scene2')) {
                let xCoord = Phaser.Math.Between(0, 100);
                let yCoord = Phaser.Math.Between(-300, 5890);
                let plane = this.physics.add.image(xCoord, yCoord, "plane2");
                plane.setScale(1.5);
                plane.setVelocityX(400);
        
                // Restart scene if player hits plane
                this.physics.add.collider(this.player, plane, () => {
                    this.scene.restart();
                    this.jetpackCollected = false;
                });
        
                // Destroy the plane after 7.5 seconds
                setTimeout(() => {
                    plane.destroy();
                }, 7500);
            }
        }
        
    
        // Define a function to create a plane at random intervals
        createPlaneAtRandomIntervals() {
            let interval = Phaser.Math.Between(550, 1000); // Random interval between 3 to 5 seconds
    
            // Call createPlane after the interval and recursively call this function
            setTimeout(() => {
                this.createPlane();
                this.createPlaneAtRandomIntervals();
            }, interval);
        }
}
