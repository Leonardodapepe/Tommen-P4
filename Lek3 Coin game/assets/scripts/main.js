class Example extends Phaser.Scene
{
    preload ()
    {
        
    }

    create ()
    {

    }

    update ()
    {

    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    backgroundColor: '#4488aa',
    parent: 'phaser-example',
    scene: Example,
    physics:{
        default:'arcade',
        arcade:{debug:false}
    }
};

const game = new Phaser.Game(config);