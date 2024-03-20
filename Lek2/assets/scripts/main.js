class Example extends Phaser.Scene
{
    singleImage;
    leaf;
    leaf_pile;
    // minVal = 100;
    // maxVal = 300;

    

    preload ()
    {
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
        for (let i=0; i < 100; i++){
        this.load.image('tree' + i, 'assets/img/Tree.png');
    }
        this.load.image('tree', 'assets/img/Tree.png');
        this.load.image('leaf', 'assets/img/Leaf.png');
        this.load.image('leaf_pile', 'assets/img/Leaf_pile.png');
        this.load.image('leafe_pile_l','assets/img/Leaf_pile_large.png');
        this.load.image('leaf_pile_s', 'assets/img/Leaf_pile_small.png');
        this.load.image('leaf_pile_xs', 'assets/img/Leaf_pile_x_small.png');
        this.load.video('background', 'assets/vid/French.mp4','loadeddata',false,true);
    
}



    create ()
    {

        var background = this.add.video(this.sys.game.config.width/2,this.sys.game.config.height/2,'background');
        background.setDepth(0);
        background.setLoop(true);
        background.play (true);
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height/1,25;

        // randomXToY();
        //     function randomXToY(minVal,maxVal)
        //     {
        //         var randVal = minVal+(Math.random()*(maxVal-minVal));
        //           return Math.round(randVal);
        //           console.log(randVal);
        //     }

        //tree
        this.singleImage = this.add.image(1355/2, 210, 'tree');

        //leaf

       // Define a function to create a leaf sprite
function createLeaf(scene) {
    let xCoord = Phaser.Math.Between(500, 850);
    let yCoord = Phaser.Math.Between(30, 150);
    let leaf = scene.physics.add.sprite(xCoord, yCoord, "leaf");
    leaf.setScale(Math.random()* 0.5+0.1);
    leaf.setGravityY(100);
    let rota = Phaser.Math.Between(-100, 100);
    leaf.setAngularVelocity(rota);
    let groundX = scene.sys.game.config.width / 2;
    let groundY = scene.sys.game.config.height * 1.278;
    let ground = scene.physics.add.sprite(groundX, groundY, "leaf");
    ground.displayWidth = scene.sys.game.config.width;
    scene.physics.add.collider(leaf, ground);
    ground.setImmovable();
    
    


    //leafcount to decide which leafpile should be displayed
    
    
    // Destroy the leaf after 3.2 seconds
    scene.time.delayedCall(3200, function() {
        leaf.destroy();
    }, [], scene);

    
}

// Define a function to create a leaf at random intervals
function createLeafAtRandomIntervals(scene) {
    let interval = Phaser.Math.Between(3500, 6000); // Random interval between 3 to 5 seconds
    scene.time.addEvent({
        delay: interval,
        callback: function () {
            createLeaf(scene);
            
            // Call this function recursively to create leaf at another random interval
            createLeafAtRandomIntervals(scene);
        },
        loop: false
    });
}

// Start creating leaves at random intervals when the scene starts
createLeafAtRandomIntervals(this);




        //leaf pile 1
        this.leaf_pile = this.add.image(677, 275, 'leaf_pile');
        this.leaf_pile.setScale(2.2,2.2);
        this.leaf_pile.setDepth(3)



    }

    update ()
    {
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1355,
    height: 621,
    backgroundColor: '#4488aa',
    parent: 'phaser-example',
    scene: Example,
    physics:{
        default:'arcade',
        arcade:{debug:false}
    }
};

const game = new Phaser.Game(config);