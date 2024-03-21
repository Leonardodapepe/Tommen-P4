class Menu extends Phaser.Scene
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
    backgroundColor: '#c8c8c8',
    parent: 'phaser-example',
    scene: Menu,
    physics:{
        default:'arcade',
        arcade:{debug:false}
    }
};

const game = new Phaser.Game(config);