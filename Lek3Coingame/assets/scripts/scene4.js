class Scene4 extends Phaser.Scene {

    constructor() {
        super({ key:'scene4'});
}
    preload(){
        //player
        this.load.spritesheet('player', 'assets/img/egg.png', { frameWidth: 320, frameHeight: 320 });

        //acid
        this.load.image('acid', 'assets/gifs/acid.gif');
        //ice
        this.load.image('ice', 'assets/img/ice.png');

        //tilemap
        this.load.tilemapTiledJSON('map4', 'map4.json');
        //tilemap img
        this.load.image('tiles4', 'map4.png');

        //fish
        this.load.image('fish', 'assets/img/fish.png');

        //shelter
         this.load.image('shelter', 'assets/img/shelter.png'); 

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




    create(){

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
        this.moveup()
    },this)
}

        //tilemap
        const map = this.make.tilemap({key:'map4'});
        const tileset = map.addTilesetImage('map4','tiles4');
        const layer = map.createLayer('Tile Layer 1', tileset, -750,-1650);
        layer.setCollisionBetween (0, 100);

        //shelter
        this.shelter = this.add.image (0, 200, 'shelter');
        this.shelter.setScale(3);
        this.shelter.setDepth(-1);

        //exit shelter
        this.sheltere = this.add.image (4500, 200, 'shelter');
        this.sheltere.setScale(3);
        this.sheltere.setDepth(-1);

        //acid
        this.acid = this.physics.add.image (2000,530, 'acid');
        this.acid.setDepth(-1);
        this.acid.setScale(1.74,1);
       this.acid.postFX.addGlow();

        //acid fish
        this.fish = this.physics.add.image (1600, 530, 'fish');
        this.fish.setVelocityX(100);


        //ice
        this.ice = this.physics.add.image (700, -50, 'ice');

         // Add player sprite
         this.player = this.physics.add.sprite(0, 0, 'player');
         this.player.setScale(0.2); // Adjust scale as needed
         this.player.setGravityY(650);
         this.player.setBounce(0.1);
         this.physics.add.collider(this.player,layer);
         this.physics.add.collider(this.player,this.fish, () => {
            this.scene.restart();
        });
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
    }


    update(){

        //scene progression
        const distanceX2 = Math.abs(this.player.x - this.sheltere.x);
        if (distanceX2 < 50) {
            this.scene.start('end');
            }
        //ice sliding
        const distanceX = Math.abs(this.player.x - this.ice.x);
        this.onIce = false;

        if (distanceX < 320){
            this.onIce = true;
        }
        else{
            this.onIce = false;
        }
        
        // Player movement
        if (!IS_TOUCH){
            if (this.onIce){
        if (this.cursors.left.isDown) {
            this.player.setAccelerationX(-600);
        } else if (this.cursors.right.isDown) {
            this.player.setAccelerationX(600);
        } else {
            this.player.setAccelerationX(0);
        }
    }
        else{
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-600);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(600);
            } else {
                this.player.setVelocityX(0);
            }}
        }
        // Player jump
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-950);
        }

        //fish movement/turning
        if (this.fish.x > 2254){
            this.fish.setVelocityX(-100);
            this.fish.flipX=true
        }
        if (this.fish.x < 1750){
            this.fish.setVelocityX (100);
            this.fish.flipX=false
        }


        //defines player's max velocity horizontal / vertical
        this.player.setMaxVelocity(600, 950)    

        // Constrain player's x position
        const minX = -550;
        const maxX = 5500;
        this.player.x = Phaser.Math.Clamp(this.player.x, minX, maxX);

        // Constrain fish's x position
        const fminX = 1586;
        const fmaxX = 2354;
        this.fish.x = Phaser.Math.Clamp(this.fish.x, fminX, fmaxX);
    }


}