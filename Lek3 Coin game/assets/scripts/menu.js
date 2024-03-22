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
        if(this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 500)){
            this.scene.start('Gamescene');
        }
    }
}

